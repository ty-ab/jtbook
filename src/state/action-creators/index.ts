import { ActionType } from "../action-types"
import type { DeleteCellAction, Direction, InsertCellAfterAction, MoveCellAction, UpdateCellAction } from "../actions"
import type { CellType } from "../cell"

export const updateCell = (id: string, content: string | null): UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content
        }
    }
}
export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: {
            id
        }
    }
}
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction
        }
    }
}
export const insertCellAfter = (id: string | null, cell: CellType): InsertCellAfterAction => {
    return {
        type: ActionType.INSERT_CELL_AFTER,
        payload: {
            id,
            type: cell
        }
    }
}
// export const bundle = (id: string, content: {
//     code: string;
//     err: string;
// }): BundleCreatedAction => {
//     return {
//         type: ActionType.BUNDLE_CREATED,
//         payload: {
//             id,
//             content
//         }
//     }
// }