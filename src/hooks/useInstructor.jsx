import { useQuery } from "@tanstack/react-query";
import React from "react";

const useInstructor = () => {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3030/users");
      return res.json();
    },
  });
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3030/classes");
      return res.json();
    },
  });

  const getEnrolledStudentCount = (instructor) =>
    classes.reduce((count, currentClass) => {
      if (currentClass.instructor_email === instructor.email) {
        return count + currentClass.enrolledStudents;
      }
      return count;
    }, 0);

  const getInstructorClassCount = (instructor) =>
    classes.filter(
      (currentClass) => currentClass.instructor_email === instructor.email
    ).length;

  const instructors = users
    .filter((user) => user.role.toLowerCase() === "instructor")
    .map((instructor) => ({
      ...instructor,
      enrollmentCount: getEnrolledStudentCount(instructor),
      classCount: getInstructorClassCount(instructor),
    }))
    .sort((a, b) => b.enrollmentCount - a.enrollmentCount);

  return [instructors];
};

export default useInstructor;
