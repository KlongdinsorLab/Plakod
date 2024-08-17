import { supabaseClient } from "./supabaseClient";

// TODO handle errors
// TODO headers

export default class supabaseAPIService  {
     async register(phoneNumber : string, age : number, gender : string, airflow : number, difficultyId : number){
          const {data,error} = await supabaseClient.functions.invoke('register',{
          headers : {
               Authorization: "Bearer " + import.meta.env.VITE_JWT_TOKEN
          },
          body : {
               phoneNumber: phoneNumber,
               age : age,
               gender : gender,
               airflow : airflow,
               difficultyId : difficultyId
          }})
          if(error) return error

          return data
     }

     async login(phoneNumber : string) {
          const {data,error} = await supabaseClient.functions.invoke('login',{
          headers : {
               Authorization: "Bearer " + import.meta.env.VITE_JWT_TOKEN
          },
          body: {
               phoneNumber : phoneNumber
          }})
          if(error) return error

          return data
     }

     async updateUsername(username : string) {
          const {data,error} = await supabaseClient.functions.invoke('update-username',{
          headers : {
               Authorization: "Bearer " + import.meta.env.VITE_JWT_TOKEN
          },
          body: {
               username : username
          }})
          if(error) return error

          return data
     }

     async updateSelectedCharacter(characterId : number) {
          const {data,error} = await supabaseClient.functions.invoke('update-selected-character',{
          headers : {
               Authorization: "Bearer " + import.meta.env.VITE_JWT_TOKEN
          },
          body: {
               character_id : characterId
          }})
          if(error) return error

          return data
     }

     async updateCurrentDifficulty(difficultyId : number) {
          const {data,error} = await supabaseClient.functions.invoke('update-selected-character',{
          headers : {
               Authorization: "Bearer " + import.meta.env.VITE_JWT_TOKEN
          },
          body: {
               difficulty_id : difficultyId
          }})
          if(error) return error

          return data
     }

     async updateAirflow(airflow : number) {
          const {data,error} = await supabaseClient.functions.invoke('update-selected-character',{
          headers : {
               Authorization: "Bearer " + import.meta.env.VITE_JWT_TOKEN
          },
          body: {
               airflow : airflow
          }})
          if(error) return error

          return data
     }
}