<template>
  <div class="container">
    <div class="header">
      <div class="back">
        <router-link to="/homePage" class="icon iconfont">&#xe611;</router-link>
      </div>
      <div class="title">门店活动</div>
    </div>
    <ul class="main">
      <li v-for="(item, index) in dataArr" @click="clickLiFn(item.activityCode)">
        <div class="liTitle">
          <div class="name" v-html="item.activityName"></div>
          <div class="peopleNum">
            <span>已报人数</span>
            <span v-html="item.activityClient"></span>
            <span>人</span>
          </div>
        </div>
        <div class="liMain">
          <div class="list">
            <div class="logoBox" :class="item.activityStatus =='N'?'time_1':'time'"></div>
            <div class="text">
              <span>时间:</span>
              <span v-html="item.activityTime"></span>
            </div>
          </div>
          <div class="list">
            <div class="logoBox" :class="item.activityStatus =='N'?'place_1':'place'"></div>
            <div class="text">
              <span>地点:</span>
              <span v-html="item.activityAddress"></span>
            </div>
          </div>
          <div class="list">
            <div class="logoBox" :class="item.activityStatus =='N'?'gift_1':'gift'"></div>
            <div class="text">
              <span>奖品:</span>
              <span v-html="item.activityPrize"></span>
            </div>
          </div>
        </div>
        <div class="isEndImg" :class="item.activityStatus =='N'?'activeNoStart':'activeEnd'"></div>
      </li>
    </ul>
    <div class="addBtn" v-if="showAdd" @click="addBtnFn"></div>
  </div>
</template>

<script>
export default {
  name: "storeActive",
  data() {
    return {
      showAdd: false,
      dataArr: []
    };
  },
  methods: {
    addBtnFn: function() {
      this.$router.push({
        path: "addActive",
        query: {}
      });
    },
    clickLiFn: function(code) {
      this.$router.push({
        path: "/activeMore",
        query: {
          activityCode: code
        }
      });
    }
  },
  mounted() {
    let _this = this;
    this.$axios
      .get("getActivityList.do", {
        params: {}
      })
      .then(res => {
        let data = res.data.data.data;
        this.dataArr = data.activityList;
        if(data.rank.rank == '1') {
          _this.showAdd = true;
        } else {
          _this.showAdd = false;
        }
      })
      .catch(function(res) {
        console.error(res);
      });
  }
};
</script>
<style lang="scss" scoped>
.addBtn {
  position: fixed;
  right: 0.2rem;
  bottom: 0.3rem;
  width: 1.5rem;
  height: 1.5rem;
  background: url(./images/11.png) no-repeat;
  background-size: 100% 100%;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  font-size: 0.3rem;
}
.header {
  position: relative;
  height: 0.8rem;
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  .back {
    height: 100%;
    width: auto;
    line-height: 0.8rem;
    font-size: 0.3rem;
    z-index: 1;
    margin-left: 0.1rem;
    font-weight: bold;
    a {
      list-style: none;
      color: #000;
      text-decoration: none;
    }
  }
  .title {
    flex: 1;
    height: 100%;
    margin-right: 0.3rem;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.34rem;
  }
}
.main {
  width: 100%;
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling : touch;
  box-sizing: border-box;
  padding: 0 0.3rem 0;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  li {
    width: 100%;
    height: 2.55rem;
    background: #fff;
    border-radius: 0.1rem;
    padding: 0 0.2rem 0 0.2rem;
    box-sizing: border-box;
    position: relative;
    box-shadow: 0rem 0rem 0.3rem rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    margin-bottom: 0.3rem;
    .liTitle {
      width: 100%;
      height: 0.66rem;
      border-bottom: 1px solid #e5e5e5;
      .name {
        display: inline-block;
        height: 100%;
        line-height: 0.7rem;
        font-size: 0.32rem;
      }
      .peopleNum {
        margin-left: 0.5rem;
        display: inline-block;
        height: 100%;
        line-height: 0.7rem;
        font-size: 0.3rem;
        color: #999;
        span {
          font-size: 0.3rem;
        }
      }
    }
    .liMain {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .list {
        width: 100%;
        height: 0.4rem;
        display: flex;
        margin-bottom: 0.15rem;
        align-items: center;
        .logoBox {
          width: 0.3rem;
          height: 0.3rem;
          margin-top: 0.05rem;
        }
        .text {
          height: 100%;
          flex: 1;
          font-size: 0.32rem;
          margin-left: 0.2rem;
          color: #999;
        }
        .time {
          background: url(./images/7.png) no-repeat;
          background-size: 100% 100%;
        }
        .time_1 {
          background: url(./images/10.png) no-repeat;
          background-size: 100% 100%;
        }
        .place {
          background: url(./images/6.png) no-repeat;
          background-size: 100% 100%;
        }
        .place_1 {
          background: url(./images/9.png) no-repeat;
          background-size: 100% 100%;
        }
        .gift {
          background: url(./images/5.png) no-repeat;
          background-size: 100% 100%;
        }
        .gift_1 {
          background: url(./images/8.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .isEndImg {
      position: absolute;
      width: 1.44rem;
      height: 1.44rem;
      top: 0;
      right: 0;
    }
    .activeEnd {
      background: url(./images/3.png) no-repeat;
      background-size: 100% 100%;
    }
    .activeNoStart {
      background: url(./images/4.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
