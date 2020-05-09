<template>
  <div class="user-container">
    <div class="user" :class="{'tree-line-to': hasChildren}">
      <div class="user__top">
        <button class="user__top-name">{{fullName}}</button>
      </div>
      <div class="user__line">
        <span title="0">ЛО: {{selfVolume}}</span>
        <span title="0">ГО: 0</span>
        <span title="0">Ранг: R</span>
      </div>
      <div class="structure__table-about-progress progress">
        <div class="structure__table-about-progress-inner" :style="{width: progressBar + '%'}"></div>
      </div>
      <button class="user__add"
              @click="createCard(card)"
      >+</button>
    </div>
    <user-children v-if="hasChildren" :cardList="card.children"></user-children>
  </div>
</template>

<script>
  import { mapActions } from "vuex"
  import UserChildren from "./UserChildren";

  export default {
    components: {
      UserChildren
    },
    props: {
      card: {
        type: Object,
        require: true,
      }
    },
    computed: {
      fullName() {
        return `${this.card.firstName} ${this.card.lastName}`
      },
      selfVolume() {
        return this.card.selfVolume
      },
      progressBar() {
        return this.card.groupVolumeProgressBar
      },
      hasChildren() {
        return this.card.children && this.card.children.length
      },
    },
    methods: {
      ...mapActions(['add_card']),
      createCard(card) {
        this.$set(card, 'fullName', this.fullName);
        this.add_card(card);
      }
    }
  }
</script>

<style lang="scss">
  .user {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #dedede;
    padding: 8px 12px;
    background: #fff;
    border-radius: 4px;
    width: 176px;
    height: 56px;
    align-items: center;
    flex-shrink: 0;
    transition: all .5s ease;
    transform: translate(0);
    box-shadow: 0 0 5px rgba(0, 0, 0, .5);
    &:hover {
      box-shadow: 0 0 10px rgba(0,0,0,.8);
    }
    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      &-name {
        font-size: 12px;
        color: #000;
        font-weight: 500;
        position: relative;
        padding-left: 15px;
        max-width: 118px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        background: none;
        border: none;
        &:after {
          position: absolute;
          top: 2px;
          left: 0;
          background: #ff9f0a;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          content: " ";
        }
      }
    }
    &__line {
      width: 100%;
      height: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-weight: 500;
        font-size: 10px;
        color: #000;
        width: 35px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    &__add {
      position: absolute;
      z-index: 20;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      border: none;
      border-radius: 50%;
      background: rgba(#fff, .3);
      box-shadow: 0 0 8px rgba(0, 0, 0, .3);
      width: 30px;
      height: 30px;
      transition: .3s;
      cursor: pointer;
      outline: none;
      &:hover {
        background: #fff;
      }
      &:active {
        box-shadow: 0 0 3px rgba(0, 0, 0, .3);
      }
    }
    &-container {
      position: relative;
      display: flex;
      align-items: center;
    }
  }

  .structure__table-about-progress {
    background: rgba(115, 139, 217, .3);
    border-radius: 5px;
    height: 4px;
    width: 100%;
    &-inner {
      background: #738bd9;
    }
  }

  .tree-line-to {
    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(100%, -50%);
      background: rgba(#000, .7);
      display: block;
      height: 1px;
      width: 56px;
    }
  }
  .tree-line:after {

  }
</style>