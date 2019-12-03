<template>
  <div class="container">
      <div class="header">
          <div class="back"><router-link to="/accountKeepe">〈 </router-link> </div>
          <div class="title">提现明细</div>
      </div>
      <div class="main">
          <ul class="list">
              <li class="listEver">
                  <div class="listEverTitle">转到银行卡</div>
                  <div class="listEverTime">2019-10-10 09:20</div>
                  <div class="listEverNum">-100.00</div>
              </li>
              <li class="listEver">
                  <div class="listEverTitle">转到银行卡</div>
                  <div class="listEverTime">2019-10-10 09:20</div>
                  <div class="listEverNum">-100.00</div>
              </li>
              <li class="listEver">
                  <div class="listEverTitle">转到银行卡</div>
                  <div class="listEverTime">2019-10-10 09:20</div>
                  <div class="listEverNum">-100.00</div>
              </li>
              <li class="listEver">
                  <div class="listEverTitle">转到银行卡</div>
                  <div class="listEverTime">2019-10-10 09:20</div>
                  <div class="listEverNum">-100.00</div>
              </li>
              <li class="listEver">
                  <div class="listEverTitle">转到银行卡</div>
                  <div class="listEverTime">2019-10-10 09:20</div>
                  <div class="listEverNum">-100.00</div>
              </li>
              <li class="listEver">
                  <div class="listEverTitle">转到银行卡</div>
                  <div class="listEverTime">2019-10-10 09:20</div>
                  <div class="listEverNum">-100.00</div>
              </li>
              <li class="listEver">
                  <div class="listEverTitle">转到银行卡</div>
                  <div class="listEverTime">2019-10-10 09:20</div>
                  <div class="listEverNum">-100.00</div>
              </li>
              <li class="listEver">
                  <div class="listEverTitle">转到银行卡</div>
                  <div class="listEverTime">2019-10-10 09:20</div>
                  <div class="listEverNum">-100.00</div>
              </li>
              <li class="listEver">
                  <div class="listEverTitle">转到银行卡</div>
                  <div class="listEverTime">2019-10-10 09:20</div>
                  <div class="listEverNum">-100.00</div>
              </li>
              <li class="listEver">
                  <div class="listEverTitle">转到银行卡</div>
                  <div class="listEverTime">2019-10-10 09:20</div>
                  <div class="listEverNum">-100.00</div>
              </li><li class="listEver">
                  <div class="listEverTitle">转到银行卡</div>
                  <div class="listEverTime">2019-10-10 09:20</div>
                  <div class="listEverNum">-100.00</div>
              </li>
              <li class="listEver">
                  <div class="listEverTitle">转到银行卡</div>
                  <div class="listEverTime">2019-10-10 09:20</div>
                  <div class="listEverNum">-100.00</div>
              </li>

          </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'homePage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #f7f7f7;
        font-size: .3rem;
    }
    .header {
        position: relative;
        height: .8rem;
        width: 100%;
        background: #fff;
        .back {
            position: absolute;
            height: 100%;
            width: auto;
            line-height: .8rem;
            // font-weight: bold;
            left: .05rem;
            font-size: .3rem;
            z-index: 1;
            a {
                list-style: none;
                text-decoration: none;
            }
        }
        .title {
            position: absolute;
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: .8rem;
            font-size: .3rem;
        }
    }
    .main {
        width: 100%;
        flex: 1;
        overflow: hidden;
        overflow-y: auto;
        .list {
            width: 100%;
            height: auto;
            background: #fff;
            margin-top: .2rem;
            box-sizing: border-box;
            padding: 0 .2rem 0 .2rem;
            .listEver {
                width: 100%;
                height: 1.25rem;
                position: relative;
                border-bottom: 1px solid #e5e5e5;
                .listEverTitle {
                    position: absolute;
                    left: 0;
                    top: .25rem;
                    font-size: .25rem;
                    color: #7d7d7d;
                }
                .listEverTime {
                    position: absolute;
                    left: 0;
                    top: .65rem;
                    font-size: .2rem;
                    color: #cdcdcd;
                }
                .listEverNum {
                    position: absolute;
                    right: 0;
                    top: .4rem;
                    font-size: .3rem;
                    color: #ff3000;
                }
            }
        }
    }
</style>
