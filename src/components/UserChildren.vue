<template>
  <div class="children-container"
       ref="childrenContainer"
  >
    <ul class="card-list"
        v-if="cardList"
        :class="{'tree-line-from': cardList.length > 1}"
    >
      <li v-for="(card, index) of cardList"
          :key="index"
          class="card-list__item"
      >
        <user-card :card="card"></user-card>
      </li>
      <!-- <li class="card__item-btn">
         <button disabled class="btn-delete">
           &times;
         </button>
       </li>-->
    </ul>
    <span class="vertical-line" :data-height="height" :style="{height}"></span>
  </div>

</template>

<script>
  export default {
    components: {
      UserCard: () => import('./UserCard')
    },
    props: {
      cardList: {
        type: Array
      }
    },
    data() {
      return {
        height: null,
        heightOfChildrenContainer: null,
        collectionLi: null,
        heightOfLastLi: null,
        heightOfFirstLi: null,
      }
    },
    mounted() {
      this.listUl = this.$refs.childrenContainer;
      this.collectionLi = [...this.listUl.children]
    },
    computed: {
      calcVerticalLineHeight() {
        this.calcHalfHeightLi();
        this.heightOfChildrenContainer = this.heightOfFirstLi + this.heightOfLastLi
        // console.log(this.$refs.childrenContainer.clientHeight)
        this.height = `calc(100% - ${this.heightOfChildrenContainer}px)`
      }
    },
    methods: {
      calcHalfHeightLi() {
        this.heightOfFirstLi = this.collectionLi[0].clientHeight / 2;
        this.heightOfLastLi = this.collectionLi[this.collectionLi.length - 1].clientHeight / 2;
        console.log('first', this.heightOfFirstLi, 'last', this.heightOfLastLi)
      },
    }
  }
</script>

<style lang="scss">
  .children-container {
    position: relative;
    margin-left: 55px;

    .vertical-line {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: calc(100% - 56px);
      width: 2px;
      background: rgba(#000, .3);
    }
  }

  .card-list {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 50;
  }

  .tree-line-from {
    padding-left: 20px;
    position: relative;

    .card-list__item {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .user {
      position: relative;

      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        height: 1px;
        width: 20px;
        background: rgba(#000, .7);
        transform: translate(-100%, -50%);
      }
    }
  }

  .card__item-btn {
    position: absolute;
    z-index: 50;
    left: 0;
    transform: translate(-50%, -50%);

    .btn-delete {
      background: #fff;
      border: none;
      box-shadow: 0 0 5px rgba(0, 0, 0, .3);
      color: red;
      cursor: pointer;
    }
  }
</style>