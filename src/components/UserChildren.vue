<template>
  <div class="children-container"
       ref="container"
  >
    <transition-group
      class="card-list"
      v-if="cardList"
      :class="{'tree-line-from': cardList.length > 1}"
      tag="ul"
      name="card-appear"
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
    </transition-group>
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
      },
    },
  }
</script>

<style lang="scss">
  .children-container {
    position: relative;
    margin-left: 55px;
  }

  .card-list {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    z-index: 50;
    &__item {
      position: relative;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }

      &:before {
        content: '';
        position: absolute;
        left: -50px;
        width: 2px;
        background: #ccc;
        transition:  opacity .4s ease-in;
        opacity: 0;
      }

      &:not(:last-child):before,
      &:not(:first-child):before {
        top: 50%;
        height: calc(100% + 22px);
        transform: translateY(-50%) scale(0) rotate(180deg);
        transform-origin: 50% 100%;
      }
      &:first-child:before {
        height: calc(50% + 11px);
        transform: scale(0);
        transform-origin: 50% 100%;
      }
      &:last-child:before {
        height: calc(50% + 11px);
        transform: scale(0);
        top: -11px;
        transform-origin: 50% 0%;
      }

    }
  }

  .tree-line-from {
    padding-left: 50px;
    & > .card-list__item {
      &:before {
        transform: translateY(-50%) scale(1);
        opacity: 1;
      }
      &:first-child:before {
        transform: scale(1);
      }
      &:last-child:before {
        transform: scale(1);
      }

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        height: 1px;
        width: 50px;
        background: rgba(#000, .7);
        transform: translate(-100%, -50%);
        transition: .3s ease;
      }
    }


   /* & ~ .user {
      position: relative;


    }*/
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