<template>
  <div :class="{'info-class':true,'pc-class':!mobile,'phone-class':mobile}">
    <a-layout>
      <a-layout-header id="header">
        <div class="header-class">
          <div class="logo-class">第一服务</div>
          <div>
            <a target="_blank" style="color: white" href="https://m.tb.cn/h.UNS6H3t">购买文章</a>
          </div>
          <div @click="handleCancel">使用教程</div>
        </div>
      </a-layout-header>
      <a-layout-content id="section">
        <div class="banner-class">
          <div class="banner-text">
            <h1>网络文章查看</h1>
            <h1>一 探索人工智能深度学习技术</h1>
          </div>
          <div class="banner-content">
            <div class="left-class">
              <h3 class="title">文档链接 *</h3>
              <div class="input-group">
                <a-input v-model:value="inputValue" placeholder="请粘贴想要查看的知乎文章链接"/>
              </div>
              <div class="button-class">
                <a-button type="primary" @click="getText">查看文章</a-button>
              </div>
            </div>
            <div class="right-class">
              <h3 class="title">操作说明</h3>
              <p>暂不支持live和音频的下载<br>复制文档网址链接粘贴到输入框<br>点击“查看文章”按钮即可</p>
              <!--              <p class="pp1">【系统特色】：</p>-->
              <!--              <p class="pp2">1.文章链接永久有效，可以分享给朋友一起观看！-->
              <!--                <br>2.一个专栏也算单篇文章！-->
              <!--              </p>-->
              <div class="r-btn"></div>
            </div>
          </div>
        </div>
        <a-spin :spinning="spinning" tip="数据加载中，请稍后...">
          <div ref="textHtmlRef" class="text-class" v-show="textHtml">
          </div>
        </a-spin>
      </a-layout-content>
    </a-layout>
  </div>
  <a-modal v-model:visible="visible" :body-style="{'padding':'10px'}">
    <template #footer>
      <div style="text-align: center">
        <a-button key="back" @click="handleCancel">关闭</a-button>
      </div>
    </template>
    <div style="font-size: 16px">
      <div>
        文章链接获取方法(手机版)<br/>
        第一步：打开APP或网站，找到需要的文章
      </div>
      <img style="width: 100%;margin: 20px 0px" :src="require('/public/image/img.png')">
      <div>
        第二步：打开文章后，点击右上方的 （。。。）分享，复制链接就可以了，复制后直接看第四步，如果没有复制链接，请看第三步
      </div>
      <img style="width: 100%;margin: 20px 0px" :src="require('/public/image/img_1.png')">
      <div>
        第三步：点击分享，点击更多，在更多种找到浏览器，然后在浏览器里复制链接就可以了！<br/>
        第四步：粘贴复制好的链接，点击查看文章就可以了
      </div>
      <img style="width: 100%;margin: 20px 0px" :src="require('/public/image/img_2.png')">
    </div>
  </a-modal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {selectContentInfo} from "@/api/getInfo";
import {useRouter} from "vue-router";
import {message} from "ant-design-vue";
import $ from 'jquery'


const router = useRouter();

const mobile = ref(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i));
const inputValue = ref('');
const visible = ref(false);
const textHtmlRef = ref(null);
const textHtml = ref('');
const codeInfo = ref('');
const spinning = ref(false);
if (!mobile.value) {
  require('@/style/pc.less')
} else {
  require('@/style/phone.less')
}
const handleCancel = () => {
  visible.value = !visible.value;
}
const getText = () => {
  if (inputValue.value) {
    spinning.value = true;
    selectContentInfo({
      url: inputValue.value,
      code: codeInfo.value
    }).then(res => {
      spinning.value = false;
      let data = res.data;
      if (data == 3) {
        message.error("此卡号已失效！！");
      } else {
        let htmlText = $(data);
        htmlText.each(function () {
          let v = $(this)[0];
          if (v.className == "central" && v.localName == "figure") {
            let img = $(v.childNodes[0]), text = $(v.childNodes[1])
            img.attr('src', img.attr('data-src'))
            img.attr('style', "width: 100%;")
            text.css('display', 'none')
          }
        });
        console.log(htmlText.toArray(), 123)
        $(textHtmlRef.value).html(htmlText);
        textHtml.value = data;
      }
    })
  } else {
    message.error('请输入链接！！');
  }
}
onMounted(() => {
  let code = router.currentRoute.value.params.code;
  codeInfo.value = code;
})
</script>

<style scoped lang="less">


</style>