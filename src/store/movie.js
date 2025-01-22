import axios from 'axios'
export default {
	// module!
	namespaced:'true',
	
	// data!   funtion() {return { movies[]}}  화살표함수
	state: ()=> ({
		movies:[],
		message:'',
		loading:false
	}),

	
	// computed!
	getter:{
		// movieIds(state){
		// 	return state.movie.map(m => m.imdbID)
		// }

	},
	
	// methods!
	// 변이  뮤테이션스에서만 변동가능
	mutations: {
		// assignMovies(state, Search){
		// 	state.movies=Search
		// },
		updateState(state,payload){
		//Object.key 는 객체데이터의 속성의 이름들만 가지고 새로운 배열 데이터을 하나 만들어줌	
			Object.keys(payload).forEach(key =>{
				state[key] = payload[key]
			}) 
		},
		resetMovies(state){
			state.moives=[]
		}
	},

	// 비동기 
	//context, payload 이름은 아무거나 해도 무방함 
	actions:{
		async searchMovies({state,commit}, payload){
			// context.state
			// context.getters
			// context.commit
			const { title, type, number, year } = payload //구조분해
			const OMDB_API_KEY ='7035c60c'
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      const {Search, totalResults} = res.data
			commit('updateState', {
				movies: Search
				// message:'hello world',
				// loading :true

			})
			console.log(totalResults)
			console.log(typeof totalResults)

			const total = parseInt(totalResults, 10)
			const pageLength = Math.ceil(total / 10)

			if(pageLength > 1) {
				for (let page = 2; page <=pageLength; page += 1){
					if(page > number / 10){
						break 
					}
					const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
					const{ Search } =res.data
					commit ('updateState',{
						movies:[...state.movies,  ...Search]
					})
				}
			}
		}
	}
}