import React, { useEffect } from "react";
import { connect } from "react-redux";
import NotFoundPage from "./NotFoundPage";
import Lesson from "../components/Lesson";
import Loading from "../components/Loading";
import { getLessonsByCourse, getCourseById } from "../selectors";
import { loadLessons, addLesson, saveLesson } from "../actions";
import "./CourseDetailPage.css";

const CourseDetailPage = ({
  course,
  loading,
  lessons,
  loadLessons,
  addLesson,
  saveLesson
}) => {
  // Must call useEffect before other conditional renders, to follow rule of hooks
  useEffect(() => {
    // Prevents error from trying to load undefined if no course found
    if (course) {
      loadLessons(course.id);
    }
  }, [course, loadLessons]);

  if (loading) {
    return <Loading />;
  }

  if (!course) {
    return <NotFoundPage />;
  }

  return (
    <div className="CourseDetail">
      <header>
        <h1>{course.name}</h1>
      </header>
      <div className="content">
        <div className="sidebar">
          {lessons.length > 0 && (
            <ul className="lessons">
              {lessons.map(lesson => (
                <li key={lesson.id}>
                  <Lesson
                    className="lesson-item"
                    lesson={lesson}
                    onSubmit={name => saveLesson({ ...lesson, name })}
                  >
                    {edit => (
                      <div className="lesson-item">
                        <span>{lesson.name}</span>
                        <button
                          onClick={() => edit(lesson.name)}
                          className="edit-lesson-btn"
                        >
                          Edit
                        </button>
                        <button className="delete-lesson-btn">Delete</button>
                      </div>
                    )}
                  </Lesson>
                </li>
              ))}
            </ul>
          )}
          <Lesson
            className="add-lesson-button"
            onSubmit={title => addLesson(title, course.id)}
          >
            {edit => (
              <button
                className="add-lesson-button"
                onClick={edit}
                type="submit"
              >
                New Lesson
              </button>
            )}
          </Lesson>
        </div>
        <div className="lesson"></div>
      </div>
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    loading: state.courses.coursesLoading,
    lessons: getLessonsByCourse(state, ownProps),
    course: getCourseById(state, ownProps)
  };
};
const mapDispatch = {
  loadLessons,
  addLesson,
  saveLesson
};
export default connect(
  mapState,
  mapDispatch
)(CourseDetailPage);
