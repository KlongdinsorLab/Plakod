export default class MockAPIService2 {
    start_game(): { message: string } {
        return {
            "message": "Ok"
        }
    }

    update_game(score: number, lap: number ): { message: string } {
        return {
            "message": "Ok"
        }
    }

    cancel_game(): { message: string } {
        return {
            "message": "Ok"
        }
    }
    finish_game(score: number, lap: number, is_booster_received: boolean): { message: string } {
        return {
            "message": "Ok"
        }
    }

    get_airflow(): { airflow: number } {
        return {
            "airflow": 300
        }
    }

    update_airflow(airflow: number): { message: string } {
        return {
            "message": "OK"
        }
    }

    update_current_difficulty(difficulty: number): { message: string } {
        return {
            "message": "OK"
        }
    }

    get_unlocked_characters(): { characters: string[] } {
        return {
            "characters": ["character1", "character2"]
        }
    }

    get_using_character(): { character: string } {
        return {
            "character": "character1"
        }
    }

    update_selected_character(): { message: string } {
        return {
            "message": "Character not unlocked"
        }
    }

    get_username(): { username: string } {
        return {
            "username": "น้องวี๊ด"
        }
    }

    update_username(username: string): { message: string } {
        return {
            "message": "OK"
        }
    }


}