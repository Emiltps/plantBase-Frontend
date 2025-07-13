import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL

export async function getAllPlants() {
    const res = await axios.get(`${API_BASE_URL}/plants`)
    return res.data.plants
}

export async function getNextDueForPlant(plantId: string) {
    const res = await axios.get(`${API_BASE_URL}/plants/${plantId}/care_schedules/next_due`)
    return res.data.nextDue
}