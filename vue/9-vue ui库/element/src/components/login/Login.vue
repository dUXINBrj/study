<template>
    <div class="container demo-1">
			<div class="content">
				<div id="large-header" class="large-header">
					<canvas id="demo-canvas"></canvas>
					<div class="main-title">
						<h1>Login</h1>
						<div>
							<input v-model="loginName" type="text" name="username" class="username" placeholder="Username" autocomplete="off"/>
						</div>
						<div>
							<input v-model="loginPwd" type="password" name="password" class="password" placeholder="Password" oncontextmenu="return false" onpaste="return false" />
						</div>
						<button id="submit" @click='login' type="button">Sign in</button>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
    export default {
		data(){
			return{
				loginName:'',
				loginPwd:''
			}
		},
        methods:{
			login(){
				if(this.loginName=='' || this.loginPwd==''){
					toastr.error("用户名或密码不能为空！");  
				}else{
					toastr.success("登陆成功!"); 
					setTimeout(function(){
						this.$router.replace({path:'/index'});
					}.bind(this),1000)
				}
			}
		}
    }
</script>

<style scoped>
h1 {
    font-size: 30px;
    font-weight: 700;
    text-shadow: 0 1px 4px rgba(0,0,0,.2);
}

form {
    width: 305px;
    margin: 0 auto;
    text-align: center;
}

input {
    width: 270px;
    height: 42px;
	line-height:42px;
    margin-top: 25px;
    padding: 0 15px;
    background: #2d2d2d; /* browsers that don't support rgba */
    *background-color:transparent;
    background: rgba(45,45,45,.15);
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    border: 1px solid #3d3d3d; /* browsers that don't support rgba */
    border: 1px solid rgba(255,255,255,.15);
    -moz-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    -webkit-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
    -ms-transition: all .2s;
}

input:-moz-placeholder { color: #fff; }
input:-ms-input-placeholder { color: #fff; }
input::-webkit-input-placeholder { color: #fff; }

input:focus {
    outline: none;
    -moz-box-shadow:
        0 2px 3px 0 rgba(0,0,0,.1) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
        0 2px 3px 0 rgba(0,0,0,.1) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:
        0 2px 3px 0 rgba(0,0,0,.1) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
}

button {
    cursor: pointer;
    width: 300px;
    height: 44px;
    margin-top: 25px;
    padding: 0;
    background: rgb(90, 174, 234);;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    border: 0px;
    -moz-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.25) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.25) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:
        0 15px 30px 0 rgba(255,255,255,.25) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
    -ms-transition: all .2s;
}

button:hover {
    -moz-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
}

button:active {
    -moz-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:        
        0 5px 8px 0 rgba(0,0,0,.1) inset,
        0 1px 4px 0 rgba(0,0,0,.1);

    border: 0px solid #ef4300;
}
</style>