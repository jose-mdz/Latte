/**
 * Created by josemanuel on 7/18/16.
 */
module latte {

    /**
     * Interface for describing objects that may acquire
     * an unsaved state.
     *
     * The object provide mechanisms to indicate:
     *  - An event to indicate when unsaved state has been acquired
     *  - A flag to query if the object has unsaved changes
     *  - A method to retrieve calls to save the changes
     */
    export interface ISave {

        /**
         * Gets or sets a value indicating if changes were reported while saving
         */
        changesWhileSaving: boolean;

        /**
         * Event raised when the value of <c>changesWhileSaving</c> property changes.
         */
        changesWhileSavingChanged: LatteEvent;

        /**
         * Gets a value indicating if changes are currently being saved.
         */
        isSavingChanges: boolean;

        /**
         * Gets or sets a value indicating if the object has an unsaved state.
         */
        unsavedChanges: boolean;

        /**
         * Event raised when the value of <c>unsavedChanges</c> property changes.
         */
        unsavedChangesChanged: LatteEvent;

        /**
         * Returns an array of calls to save the changes.
         * The code handling the calls result should manually change the value of <c>unsavedChanges</c> to <c>false</c>
         * in case the save call is successful.
         */
        getSaveCalls(): ICall[];

    }

}