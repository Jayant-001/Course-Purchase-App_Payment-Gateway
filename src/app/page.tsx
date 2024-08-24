import CourseCard from "@/components/custom/CourseCard";
import MyScript from "@/components/custom/MyScript";
import axios from "axios";

const fetchCourses = async () => {
    try {
        const { data } = await axios.get(
            `${process.env.SERVER_URL}/api/courses`
        );
        return data.courses;
    } catch (error) {
        return null;
    }
};

interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    duration: number; // Duration can be in hours or another unit as needed
    instructor: string;
}

export default async function Home() {
    
    // fetch all courses from DB
    const courses: Course[] = await fetchCourses();

    return (
        <>
            <MyScript />
            <div className="grid grid-cols-6 gap-3 m-5">
                {courses.map((course, id) => (
                    <CourseCard course={course} key={id} />
                ))}
            </div>
        </>
    );
}
