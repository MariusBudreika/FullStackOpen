function Course({ course }) {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <h2>{course.name}</h2>
      <div>
        {course.parts.map((part) => (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        ))}
        <p style={{ fontWeight: "bold" }}>Total of {total} exercises</p>
      </div>
    </div>
  );
}

export default Course;
