// Repository for accessing course data

import fs from 'fs/promises';
import path from 'path'

const filePath = path.join(process.cwd(), 'src/db', 'courses.json');


// Read JSON data from the file
 async function readData() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error);
        throw error;
    }
}

// Write JSON data to the file
 async function writeData(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing data:', error);
        throw error;
    }
}

// Create a new course
export async function createCourse(newCourse) {
    try {
        const data = await readData();
        newCourse.id = data.length ? Math.max(data.map(course => course.id)) + 1 : 1;
        data.push(newCourse);
        await writeData(data);
        return newCourse;
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
}

// Read a course by ID
export async function getCourse(id) {
    try {
        const data = await readData();
        const course = data.find(c => c.id === id);
        if (!course) throw new Error('Course not found');
        return course;
    } catch (error) {
        console.error('Error reading course:', error);
        throw error;
    }
}

// Update a course by ID
export async function updateCourse(id, updatedCourse) {
    try {
        const data = await readData();
        const index = data.findIndex(c => c.id === id);
        if (index === -1) throw new Error('Course not found');

        data[index] = { ...data[index], ...updatedCourse };
        await writeData(data);
        return data[index];
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }
}

// Delete a course by ID
export async function deleteCourse(id) {
    try {
        const data = await readData();
        const index = data.findIndex(c => c.id === id);
        if (index === -1) throw new Error('Course not found');

        const deletedCourse = data.splice(index, 1)[0];
        await writeData(data);
        return deletedCourse;
    } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
    }
}

// Get all courses
export async function getAllCourses() {
    try {
        return await readData();
    } catch (error) {
        console.error('Error getting all courses:', error);
        throw error;
    }
}

// module.exports = {
//     createCourse,
//     getCourse,
//     updateCourse,
//     deleteCourse,
//     getAllCourses
// };
