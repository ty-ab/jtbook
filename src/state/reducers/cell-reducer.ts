import type { Cell } from "../cell"
import { ActionType } from "../action-types"
import type { Action } from "../actions"
import { produce } from "immer"

interface CellState {
    loading: boolean,
    error: string | null
    order: string[]
    data: {
        [key: string]: Cell
    }
}

const initState: CellState = {
    loading: false,
    error: null,
    order: [],
    data: {}
}

const reducer = produce((state: CellState = initState, action: Action) => {
    // setAutoFreeze(false);

    switch (action.type) {
        case ActionType.UPDATE_CELL:
            const { id, content } = action.payload
            state.data[id].content = content || ""
            return state
        case ActionType.DELETE_CELL:
            delete state.data[action.payload.id]
            state.order = state.order.filter((id) => id !== action.payload.id)
            return state
        case ActionType.MOVE_CELL:
            const { direction } = action.payload
            const index = state.order.findIndex((id) => id === action.payload.id)
            const targetIndex = direction === "up" ? index - 1 : index + 1
            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return state
            }
            state.order[index] = state.order[targetIndex]
            state.order[targetIndex] = action.payload.id
            return state
        case ActionType.INSERT_CELL_AFTER:
            const cell: Cell = {
                id: randomId(),
                type: action.payload.type,
                content: ""
            }

            state.data[cell.id] = cell
            const foundIndex = state.order.findIndex((id) => id === action.payload.id)
            if (foundIndex < 0) {
                state.order.unshift(cell.id)
            } else {
                state.order.splice(foundIndex+1, 0, cell.id)
            }
            return state
        default:
            return state
    }
})

const randomId = () => {
    return Math.random().toString(36).substring(2, 5)
}

export default reducer