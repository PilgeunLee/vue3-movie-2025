import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
	// module!
	namespaced:'true',
	
	// data!   funtion() {return { movies[]}}  화살표함수
	state: ()=> ({
		movies:[],
		message:'Seach for the movie title!',
		loading:false,
		theMovie:{}
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
			if(state.loading){
				return
			}

			commit('updateState',{
				message:'',
				loading:true
			})
			// context.state
			// context.getters
			// context.commit
			//const { title, type, number, year } = payload //구조분해
			try{
				const res = await _fetchMovie({
					...payload,
					page : 1
				})
				const {Search, totalResults} = res.data
				commit('updateState', {
					movies: _uniqBy(Search, 'imdbID')
					// message:'hello world',
					// loading :true
	
				})
				console.log(totalResults)
				console.log(typeof totalResults)
	
				const total = parseInt(totalResults, 10)
				const pageLength = Math.ceil(total / 10)
	
				if(pageLength > 1) {
					for (let page = 2; page <=pageLength; page += 1){
						if(page > (payload.number/ 10)){
							break 
						}
						const res = await _fetchMovie({
							...payload,
							page
						})
						const{ Search } =res.data
						commit ('updateState',{
							movies: [
								...state.movies,
								..._uniqBy(Search,'imdbID')
							]
						})
					}
				}	
			} catch(message){
				commit('updateState',{
					movies:[],
					message
				})
			} finally{
				commit('updateState',{
					loading:false
				})
			}    
		},
		async searchMovieWithId({state, commit}, payload) {
			if(state.loading)return

			commit('updateState',{
				theMovie:{},
				loading:true
			})

			try {
				const res = await _fetchMovie(payload)
				commit('updateState', {
					theMovie: res.data
				})
			} catch (error) {
				commit('updateState', {
					theMovie:{}
				})
			} finally {
				commit('updateState', {
					loading:false
				})
			}
		}
	}
}

// _해당파일에서만 사용되는 의미
function _fetchMovie(payload) {
	const {title, type, year, page, id} =payload
	const OMDB_API_KEY ='7035c60c'
	const url = id 
		? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
		: `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`



	return new Promise((resolve, reject) =>{
		axios.get(url)
			.then(res =>{
				if(res.data.Error){
					reject(res.data.Error)
				}
				resolve(res)
			})
			.catch(err =>{
				reject(err.message)
			})
	})

}