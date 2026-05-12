"use client"

import type {UserRegistration} from "@/types"
import {useEffect, useState} from "react";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {registerUser} from "@/lib/userAPIs";

export default function useRegistration() {

    const emptyForm: UserRegistration = {
    clerk_id: "",
    first_name: "",
    last_name: "",
    email: "",
    school: "",
    state: "",
    grade_level: "",
    current_score: 0,
    dream_score: 0,
    test_date: "",
    subscription: "",
    proficiency: "",
    referral: ""
    }
    const [form, setForm] = useState<UserRegistration>(emptyForm)
    const [error, setError] = useState("")
    const router = useRouter()

    // Protect the page from unauthenticated register
    const {user, isLoaded} = useUser();

    // Checks to see if the individual is signed in
    useEffect(() => {
        if (isLoaded && !user) router.push("/")
    }, [isLoaded, user]);

    // Adds the email and clerk ID automatically to the registration form
    useEffect(() => {
        if (isLoaded && user) {
            setForm(prev => ({
                ...prev,
                clerk_id : user.id,
                email : user.emailAddresses[0].emailAddress
            }))
        }
    }, [isLoaded, user]);

    // Detects if there is a change in the form
    const fieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setForm(prev => ({
            ...prev,
            [name]:value
        }))
    }

    // Validate the form for missing information
    const validateForm = () => {
        const missing: string[] = []

        const missingFields = ["first_name", "last_name", "grade_level", "current_score", "dream_score", "test_date", "subscription", "proficiency"]
        missingFields.forEach(i => {
            if (!form[i as keyof UserRegistration]) missing.push(i)
        })

        return missing
    }

    const handleSave = async () => {
        const missing = validateForm()
        if (missing.length > 0) {
            setError(`Missing: ${missing.join(", ")}`)
            return
        }

        // Error Handling
        if (!form) {
            setError("The registration form is empty.")
            return
        }
        if (form.current_score < 400 || form.current_score > 1600) {
            setError("Current Score must be between 400 and 1600")
            return
        }
        if (form.dream_score < 400 || form.dream_score > 1600) {
            setError("Dream Score must be between 400 and 1600")
            return
        }

        // Save the user information in the database
        try {
            console.log("updated form", form)
            const response = await registerUser(form)

            if (form.subscription === "professional") {
                router.push("/dashboard")
            } else {
                router.push("/billing")
            }
        } catch (err:any) {
            setError(err.message || "Failed to save user information")
        }
    }

    return {
        form, error, setError,
        fieldChange, handleSave
    }
}