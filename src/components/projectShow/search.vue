<template>
  <div class="container">
    <div class="header">
      <div class="back">
        <router-link to="/projectShow" class="icon iconfont">&#xe611;</router-link>
      </div>
      <div class="title">搜索</div>
    </div>
    <div class="main">
      <div class="searchBox">
        <div class="sBox">
          <span class="icon"></span>
          <input type="text" placeholder="请输入关键词" v-model="search"/>
        </div>
        <span class="close" @click="searchFn(search)">搜索</span>
      </div>
      <div class="historyHotsearch">
        <div class="historyBox">
          <span class="text">历史搜索</span>
          <span class="del">
            <span class="delIco"></span>
            <span class="delText">清空历史</span>
          </span>
        </div>
        <ul class="historyList">
          <!-- <li @click="searchFn('长盈三号')">长盈三号</li> -->
        </ul>
        <div class="searchHotBox">
          <span class="text">热门搜索</span>
        </div>
        <ul class="searchHotList">
          <!-- <li @click="searchFn('长盈三号')">长盈三号</li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "homePage",
    data() {
        return {
            search:'', // 搜索
        };
    },
    methods: {
        /**
         * 搜索
        */
        searchFn: function (value) {
          let _this = this;
          _this.$router.push({
              path: '/projectShow',
              query: {
                  search: value
              }
          });
        }
    },
    mounted () {
      this.search = this.$route.query.search;
    }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  font-size: 0.3rem;
}
.header {
  position: relative;
  height: 0.8rem;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  .back {
      height: 100%;
      width: .5rem;
      line-height: 0.8rem;
      font-size: 0.3rem;
      font-weight: bold;
      a {
          width: 100%;
          height: 100%;
          display: block;
          list-style: none;
          margin-left: .1rem;
          text-decoration: none;
      }
  }
  .title {
      flex: 1;
      height: 100%;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.34rem;
      margin-right: .3rem;
  }
}
.main {
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
}
.searchBox {
  width: 100%;
  height: 1.15rem;
  display: flex;
  .sBox {
    flex: 1;
    display: flex;
    height: 0.6rem;
    background: #f5f5f5;
    border-radius: 0.3rem;
    overflow: hidden;
    align-items: center;
    .icon {
      display: block;
      width: 0.34rem;
      height: 0.34rem;
      background: url(./images/1.png) no-repeat;
      background-size: 100% 100%;
      margin-left: 0.2rem;
    }
    input {
      height: 100%;
      flex: 1;
      border: none;
      outline: none;
      background: #f5f5f5;
      border-radius: 0rem 0.3rem 0.3rem 0;
      margin-left: 0.2rem;
      font-size: 0.32rem;
    }
  }
  .close {
    font-size: 0.32rem;
    margin-left: 0.3rem;
  }
}
.historyHotsearch {
  flex: 1;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  .historyBox {
    width: 100%;
    position: relative;
    .text {
      font-size: 0.32rem;
      color: #999;
    }
    .del {
      position: absolute;
      right: 0;
      .delIco {
        display: inline-block;
        width: 0.35rem;
        height: 0.35rem;
        background: url(./images/2.png) no-repeat;
        background-size: 100% 100%;
      }
      .delText {
        position: relative;
        top: -0.1rem;
        line-height: 0.37rem;
        font-size: 0.28rem;
        color: #999;
      }
    }
  }
  .historyList {
    width: 100%;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    flex-wrap: wrap;
    li {
      height: 0.6rem;
      padding: 0 0.2rem 0 0.2rem;
      border-radius: 0.3rem;
      border: 1px solid #e5e5e5;
      color: #666;
      font-size: 0.3rem;
      line-height: 0.6rem;
      margin-top: 0.2rem;
      margin-left: 0.2rem;
    }
  }
  .searchHotBox {
    width: 100%;
    margin-top: 0.2rem;
    .text {
      font-size: 0.32rem;
      color: #999;
    }
  }
  .searchHotList {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    li {
      height: 0.6rem;
      padding: 0 0.2rem 0 0.2rem;
      border-radius: 0.3rem;
      border: 1px solid #e5e5e5;
      color: #666;
      font-size: 0.3rem;
      line-height: 0.6rem;
      margin-top: 0.2rem;
      margin-left: 0.2rem;
    }
  }
}
.projectList {
  flex: 1;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  .list {
    width: 100%;
    box-sizing: border-box;
    padding: 0.2rem;
    .li_1 {
      width: 100%;
      height: 1.8rem;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 0.2rem;
      margin-bottom: 0.2rem;
      a {
        text-decoration: none;
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        color: #000;
      }
      img {
        width: 1.62rem;
        height: 1.43rem;
        border-radius: 0.1rem;
      }
      .rightBox {
        flex: 1;
        height: 100%;
        margin-left: 0.2rem;
        .title {
          width: 100%;
          font-size: 0.28rem;
        }
        .text {
          width: 100%;
          margin-top: 0.1rem;
          .age {
            display: block;
            width: 100%;
            span {
              font-size: 0.24rem;
              color: #999;
            }
            .span {
              margin-left: 0.3rem;
              color: #999;
            }
          }
          .year {
            width: 100%;
            display: block;
            span {
              font-size: 0.24rem;
              color: #999;
            }
            .span {
              margin-left: 0.3rem;
              color: #999;
            }
          }
        }
        .priceBox {
          width: 100%;
          display: flex;
          margin-top: 0.15rem;
          justify-content: space-between;
        }
        .price {
          font-size: 0.28rem;
          color: #ff4c26;
        }
        .pastPrice {
          margin-right: 0.2rem;
          font-size: 0.28rem;
          color: #42ae5b;
        }
      }
    }
    .li_0 {
      width: 100%;
      height: 1.5rem;
      text-align: center;
      color: #777;
      font-size: 0.3rem;
    }
  }
  .loading {
    width: 100%;
    height: 1rem;
    text-align: center;
    color: #999;
  }
  .noMore {
    width: 100%;
    height: 1rem;
    text-align: center;
  }
}
</style>
