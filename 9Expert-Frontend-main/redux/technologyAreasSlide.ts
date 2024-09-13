import { TTechnologyArea } from "@/app/admin/interface/CreateCourseInterface"
import { RootState } from "@/store"
import { Slice, createSlice } from "@reduxjs/toolkit"

const initialState: TTechnologyArea[] = []

export const TechnologyAreasSlice: Slice = createSlice({
    name: 'technologyAreas',
    initialState,
    reducers: {
        setTechnologyAreas: (state, action) => state = action.payload
    }
})

export const { setTechnologyAreas } = TechnologyAreasSlice.actions
export default TechnologyAreasSlice.reducer
export const getTechnologyAreas = (state: RootState) => state.TechnologyAreas