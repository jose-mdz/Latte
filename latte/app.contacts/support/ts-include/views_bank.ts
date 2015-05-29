module latte{ 
    export var globalViewsBank = {
    "ContactsMainViewBase": "<div data-class=\"ContactsMainViewBase\" class=\"contacts-ui\">\n\n    <!-- GROUPS PANEL -->\n    <div data-property=\"listGroups\" class=\"panel-groups\">\n        \n        \n        <div class=\"list-item\">All iCloud</div>\n        <div class=\"list-item\">Group A</div>\n        <div class=\"list-item\">Group B</div>\n        <div class=\"list-item-header\">Facebook</div>\n        <div class=\"list-item\">All Facebook</div>\n        <div class=\"list-item-header\">Smart Groups</div>\n        <div class=\"list-item\">Last Import</div>\n    </div>\n\n    <!-- NAMES LIST PANEL -->\n    <div class=\"panel-list\">\n        <div class=\"search-box\">\n            <input data-property=\"txtSearch\" data-event=\"input:loadContacts\" type=\"text\" placeholder=\"Search\">\n        </div>\n\n        <div data-property=\"listPeople\" class=\"list\">\n            <div class=\"no-items\">No contacts found</div>\n            <div class=\"list-item-header\">A</div>\n            \n            <div class=\"list-item selected\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item\">Alchemist Joe</div>\n            <div class=\"list-item-header\">B</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item\">Bradbury Jack</div>\n            <div class=\"list-item-header\">D</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n            <div class=\"list-item\">Doe John</div>\n        </div>\n    </div>\n\n    <!-- CONTACT DETAIL PANEL -->\n    <div data-property=\"panelDetail\" class=\"panel-detail\">\n        <div data-property=\"detailHeader\" class=\"header\">\n            <div class=\"picture-side\">\n                <div class=\"picture\">\n                    <div data-property=\"lblInitials\" data-bind=\"initials\">AJ</div>\n                </div>\n            </div>\n            <div class=\"name-side\">\n                <div class=\"name-row\">\n                    <div data-property=\"lblFirstName\" data-bind=\"lastname\" class=\"name\">Alchemist</div>\n                    <div data-property=\"lblLastName\" data-bind=\"name\" class=\"last\">Joe</div>\n                </div>\n                <div data-property=\"lblDescription\" data-bind=\"company\" class=\"description\">Superworks, Inc.</div>\n            </div>\n        </div>\n        <div data-property=\"detailRows\" class=\"rows\">\n            <div class=\"data\">\n                <div class=\"name\">email</div>\n                <div data-bind=\"email\" class=\"value\">a@a.com</div>\n            </div>\n            <div class=\"data\">\n                <div class=\"name\">phone</div>\n                <div data-bind=\"phone\" class=\"value\">+(55) 123456789</div>\n            </div>\n            <div class=\"data\">\n                <div class=\"name\">mobile</div>\n                <div data-bind=\"mobile\" class=\"value\">+(54) 123456789</div>\n            </div>\n            <div class=\"data\">\n                <div class=\"name\">address</div>\n                <div data-bind=\"address\" class=\"value\">Elm Street 1090, TX, PA 9875</div>\n            </div>\n            <div class=\"data\">\n                <div class=\"name\">note</div>\n                <div data-bind=\"note\" class=\"value\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat molestie enim, vel viverra odio malesuada quis. Nulla gravida vulputate nulla, non egestas elit pretium et. </div>\n            </div>\n        </div>\n        <div data-property=\"detailToolbar\" class=\"toolbar\">\n            <div data-property=\"btnAdd\" class=\"button btn-add\">+</div>\n            <div class=\"button btn-export\">...</div>\n            <div data-property=\"btnEdit\" class=\"button btn-edit\">Edit</div>\n        </div>\n    </div>\n</div>",
    "CategoryListItem": "<div class=\"list-item\" data-class=\"CategoryListItem\"><span data-bind=\"name\">All Contacts</span></div>",
    "ListItemHeader": "<div class=\"list-item-header\" data-class=\"ListItemHeader\">iCloud</div>",
    "PersonListItem": "<div class=\"list-item\" data-class=\"PersonListItem\"><span data-bind=\"fullName\">Alchemist Joe</span></div>"
} 
}