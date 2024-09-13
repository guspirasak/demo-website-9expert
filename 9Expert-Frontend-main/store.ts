import { configureStore } from "@reduxjs/toolkit"

import CourseGroup from "./redux/courseGroupSlide"
import TechnologyAreas from "./redux/technologyAreasSlide"

export const store = configureStore({
    reducer: {
        TechnologyAreas,
        CourseGroup
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch