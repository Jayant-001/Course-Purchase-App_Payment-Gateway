import { getAllCourses } from "@/db/course";

// Returns all courses in a list
export async function GET(request: Request) {
    const courses = await getAllCourses();

    return Response.json({ courses });
}
