<template>
	<div>
		<cube-form :model="model" :schema="schema" @submit="handleLogin" @validate="haneldValidate">
		</cube-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					username: "",
					passwd: ""
				},
				schema: {
					// 表单结构定义
					fields: [
						// 字段数组
						{
							type: "input",
							modelKey: "username",
							label: "用户名",
							props: {
								placeholder: "请输入用户名"
							},
							rules: {
								// 校验规则
								required: true
							},
							trigger: "blur"
						},
						{
							type: "input",
							modelKey: "passwd",
							label: "密码",
							props: {
								type: "password",
								placeholder: "请输入密码",
								eye: {
									open: true
								}
							},
							rules: {
								required: true
							},
							trigger: "blur"
						},
						{
							type: "submit",
							label: "登录"
						}
					]
				}
			};
		}
	}
	methods: {
		handleLogin(e) {
			//阻止提交
			e.preventDefault();
			this.$store.dispatch('login', this.model).then(
				code => {
					if (code) {
						//登录成功  重定向
						const path = this.$router.query.redirect;
						this.$router.push(path);
					}
				}
			).catch(error => {
				// 有错误发生或者登录失败
				const toast = this.$createToast({
					time: 2000,
					txt: error.message || error.response.data.message || "登录失败",
					type: "error"
				});
				toast.show();
			});
		},
		haneldValidate(ret) {
			console.log(ret);
		}

	}
</script>

<style>
</style>
