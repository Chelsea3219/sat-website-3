import type {UserRegistration} from "../types"


// Calls the API to register new users in the dataframe
export async function registerUser(user_info: UserRegistration) {
    const response = await fetch("api/register", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user_info),
    })

    const data = await response.json()
    return data
}