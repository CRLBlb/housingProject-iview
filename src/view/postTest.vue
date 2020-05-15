<template>
    <div class="layout">
       <Content>
        <Form :model="post" label-position="left" :rules="dataRules" :label-width="100">
            <FormItem label="eid" prop="eid">
                <Input v-model="post.eid" type="number"></Input>
            </FormItem>
            <FormItem label="aid" prop="aid">
                <Input v-model="post.aid" type="number"></Input>
            </FormItem>
            <FormItem label="hname" prop="hname">
                <Input v-model="post.hname"></Input>
            </FormItem>
            <FormItem label="hprice" prop="hprice">
                <Input v-model="post.hprice" type="number"></Input>
            </FormItem>
            <FormItem label="haddress" prop="haddress">
                <Input v-model="post.haddress"></Input>
            </FormItem>
            <FormItem label="hsquare" prop="hsquare">
                <Input v-model="post.hsquare" type="number"></Input>
            </FormItem>
            <FormItem label="himage" prop="himage">
                <Input v-model="post.himage"></Input>
            </FormItem>
            <FormItem label="hinfo" prop="hinfo">
                <Input v-model="post.hinfo"></Input>
            </FormItem>
            <FormItem label="hbriefinfo" prop="hbriefinfo">
                <Input v-model="post.hbriefinfo"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="PostHouse()">Submit</Button>
              </FormItem>
            <FormItem>
                <Button type="primary" @click="updateHouse()">test</Button>
              </FormItem>
        </Form>
        {{post}}
                <Form :model="update" label-position="left" :rules="dataRules" :label-width="100">
            <FormItem label="hid" prop="hid">
                <Input v-model="update.hid" type="number"></Input>
            </FormItem>
            <FormItem label="hname" prop="hname">
                <Input v-model="update.hname"></Input>
            </FormItem>
            <FormItem label="hprice" prop="hprice">
                <Input v-model="update.hprice" type="number"></Input>
            </FormItem>
            <FormItem label="haddress" prop="haddress">
                <Input v-model="update.haddress"></Input>
            </FormItem>
            <FormItem label="hsquare" prop="hsquare">
                <Input v-model="update.hsquare" type="number"></Input>
            </FormItem>
            <FormItem label="himage" prop="himage">
                <Input v-model="update.himage"></Input>
            </FormItem>
            <FormItem label="hinfo" prop="hinfo">
                <Input v-model="update.hinfo"></Input>
            </FormItem>
            <FormItem label="hbriefinfo" prop="hbriefinfo">
                <Input v-model="update.hbriefinfo"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="updateHouse()">test</Button>
              </FormItem>
        </Form>
        <Form :model="comment" label-position="left"  :label-width="100">
            <FormItem label="eid" prop="eid">
                <Input v-model="comment.eid"></Input>
            </FormItem>
            <FormItem label="uid" prop="uid">
                <Input v-model="comment.uid"></Input>
            </FormItem>
            <FormItem label="ccontent" prop="ccontent">
                <Input v-model="comment.ccontent"></Input>
            </FormItem>
            <FormItem label="crating" prop="crating">
                <Input v-model="comment.crating"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="test()">test</Button>
            </FormItem>
        </Form>
        {{comment}}
          <Form :model="question" label-position="left"  :label-width="100">
            <FormItem label="uid" prop="uid">
                <Input v-model="question.uid"></Input>
            </FormItem>
            <FormItem label="hid" prop="hid">
                <Input v-model="question.hid"></Input>
            </FormItem>
            <FormItem label="qcontent" prop="qcontent">
                <Input v-model="question.qcontent"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="postQuestion()">test</Button>
            </FormItem>
          </Form>
          {{question}}
          <Form :model="rating" label-position="left"  :label-width="100">
            <FormItem label="uid" prop="uid">
                <Input v-model="rating.uid"></Input>
            </FormItem>
            <FormItem label="aid" prop="aid">
                <Input v-model="rating.aid"></Input>
            </FormItem>
            <FormItem label="arating" prop="arating">
                <Input v-model="rating.arating"></Input>
            </FormItem>
            <FormItem label="acomment" prop="acomment">
                <Input v-model="rating.acomment"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="postRate()">test</Button>
            </FormItem>
          </Form>
          {{rating}}
          <Form :model="forum" label-position="left"  :label-width="100">
            <FormItem label="uid" prop="uid">
                <Input v-model="forum.uid"></Input>
            </FormItem>
            <FormItem label="ptitle" prop="ptitle">
                <Input v-model="forum.ptitle"></Input>
            </FormItem>
            <FormItem label="pcontent" prop="pcontent">
                <Input v-model="forum.pcontent"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="postForum()">test</Button>
            </FormItem>
          </Form>
          {{forum}}
          <Form :model="reply" label-position="left"  :label-width="100">
            <FormItem label="pid" prop="pid">
                <Input v-model="reply.pid"></Input>
            </FormItem>
            <FormItem label="id" prop="id">
                <Input v-model="reply.id"></Input>
            </FormItem>
            <FormItem label="rcontent" prop="rcontent">
                <Input v-model="reply.rcontent"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="postUserReply()">user</Button>
                <Button type="primary" @click="postAgentReply()">agent</Button>
            </FormItem>
          </Form>
          {{reply}}
          <Form :model="object" label-position="left"  :label-width="100">
            <FormItem label="id" prop="id">
                <Input v-model="object.id"></Input>
            </FormItem>
            <FormItem label="nid" prop="nid">
                <Input v-model="object.nid"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="postObject()">test</Button>
            </FormItem>
          </Form>
          {{object}}
       </Content>
    </div>
</template>
<script>
export default {
  data () {
    return {
      house: {},
      update: {
        hid: 0,
        hname: '',
        hprice: 0,
        haddress: '',
        hsquare: 0,
        himage: '',
        hinfo: '',
        hbriefinfo: ''
      },
      post: {
        eid: 0,
        aid: 0,
        hname: '',
        hprice: 0,
        haddress: '',
        hsquare: 0,
        himage: '',
        hinfo: '',
        hbriefinfo: ''
      },
      comment: {
        eid: '',
        uid: '',
        ccontent: '',
        crating: ''
      },
      question: {
        uid: '',
        hid: '',
        qcontent: ''
      },
      rating: {
        uid: '',
        aid: '',
        arating: '',
        acomment: ''
      },
      forum: {
        uid: '',
        ptitle: '',
        pcontent: ''
      },
      reply: {
        pid: '',
        id: '',
        rcontent: ''
      },
      object: {
        id: '',
        nid: ''
      },
      dataRules: {
        eid: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'number', message: '', trigger: 'blur' }
        ],
        aid: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'number', message: '', trigger: 'blur' }
        ],
        hname: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'string', message: '', trigger: 'blur' }
        ],
        hprice: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'number', message: '', trigger: 'blur' }
        ],
        haddress: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'string', message: '', trigger: 'blur' }
        ],
        hsquare: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'number', message: '', trigger: 'blur' }
        ],
        himage: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'string', message: '', trigger: 'blur' }
        ],
        hinfo: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'string', message: '', trigger: 'blur' }
        ],
        hbriefinfo: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'string', message: '', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    PostHouse () {
      var postData = this.$qs.stringify({
        eid: this.post.eid,
        aid: this.post.aid,
        hname: this.post.hname,
        hprice: this.post.hprice,
        haddress: this.post.haddress,
        hsquare: this.post.hsquare,
        himage: this.post.himage,
        hinfo: this.post.hinfo,
        hbriefinfo: this.post.hbriefinfo
      })
      var that = this
      that
        .$axios({
          method: 'post',
          url: 'house/post',
          data: postData
        })
        .then(res => {
          this.house = res.data.content
          console.log(res)
        })
    },
    test () {
      var that = this
      that
        .$axios({
          method: 'post',
          url: 'comments/post',
          data: this.comment
        })
        .then(res => {
          console.log(res)
        })
    },
    postQuestion () {
      var that = this
      that
        .$axios({
          method: 'post',
          url: 'house/question',
          data: this.question
        })
        .then(res => {
          console.log(res)
        })
    },
    postRate () {
      var that = this
      that
        .$axios({
          method: 'post',
          url: 'agent/rating',
          data: this.rating
        })
        .then(res => {
          console.log(res)
        })
    },
    postForum () {
      var that = this
      that
        .$axios({
          method: 'post',
          url: 'forum/post',
          data: this.forum
        })
        .then(res => {
          console.log(res)
        })
    },
    postUserReply () {
      var that = this
      that
        .$axios({
          method: 'post',
          url: 'forum/user/reply',
          data: this.reply
        })
        .then(res => {
          console.log(res)
        })
    },
    postAgentReply () {
      var that = this
      that
        .$axios({
          method: 'post',
          url: 'forum/agent/reply',
          data: this.reply
        })
        .then(res => {
          console.log(res)
        })
    },
    postObject () {
      var that = this
      that
        .$axios({
          method: 'post',
          url: 'group/object',
          data: this.object
        })
        .then(res => {
          console.log(res)
        })
    },
    updateHouse () {
      var post = this.$qs.stringify(this.update)
      var that = this
      that
        .$axios({
          method: 'put',
          url: 'house/update',
          data: post
        })
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>
