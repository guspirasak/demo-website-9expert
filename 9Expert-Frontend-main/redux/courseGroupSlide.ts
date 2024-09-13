import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import { RootState } from "@/store"
import { Slice, createSlice } from "@reduxjs/toolkit"


const initialState: TCourseGroup[] = []

export const CourseGroupSlice: Slice = createSlice({
    name: 'CourseGroup',
    initialState,
    reducers: {
        setCourseGroup: (state, action) => state = action.payload
    }
})

export const { setCourseGroup } = CourseGroupSlice.actions
export default CourseGroupSlice.reducer
export const getCourseGroup = (state: RootState) => state.CourseGroup