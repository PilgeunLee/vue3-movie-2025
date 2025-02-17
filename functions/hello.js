exports.handler = async function(event, context){
	return{
		statusCode:200,
		body:JSON.stringify({
			name:'pigney',
			age:42,
			email:'pgstom84@naver.com'
		})
	}
}