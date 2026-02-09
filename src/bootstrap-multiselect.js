const mergeOptions = function (defaults, options, dataset) {
    const newOptions = {};
    Object.keys(defaults).forEach((key) => {
        if (dataset[key]) {
            newOptions[key] = dataset[key];
            return;
        }
        if (options[key]) {
            newOptions[key] = options[key];
            return;
        }
        newOptions[key] = defaults[key];
    });
    return newOptions;
};

/**
 * Generate a unique identifier
 * @returns unique id
 */
const generateUniqueId = function () {
    return Math.random().toString(36).substring(2);
};

const wrap = function (el) {
    const span = document.createElement('span');
    span.classList.add('multiselect-native-select');
    el.replaceWith(span);
    span.append(el);
    return span;
};

// TODO test this
const unwrap = function (el) {
    // Get the parent element
    const parent = el.parentNode;

    parent.replaceWith(el);
};

/**
 * @param {String} html
 * @returns {HTMLElement}
 */
const getElementFromString = function (html) {
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = html;
    return tempContainer.firstElementChild;
};

const defaults = {
    /**
     * Default text function will either print 'None selected' in case no
     * option is selected or a list of the selected options up to a length
     * of 3 selected options.
     *
     * @param {Array<HTMLOptionElement>} options
     * @param {HTMLSelectElement} select
     * @returns {String}
     */
    buttonText: function (selectedOptions, select) {
        if (this.disabledText.length > 0 && select.disabled) {
            return this.disabledText;
        }
        if (selectedOptions.length === 0) {
            return this.nonSelectedText;
        }

        const optionCount = select.querySelectorAll('option').length;
        if (this.allSelectedText
            && selectedOptions.length === optionCount
            && optionCount !== 1
            && this.multiple) {
            if (this.selectAllNumber) {
                return `${this.allSelectedText} (${selectedOptions.length})`;
            } else {
                return this.allSelectedText;
            }
        }
        if (this.numberDisplayed != 0 && selectedOptions.length > this.numberDisplayed) {
            return `${selectedOptions.length} ${this.nSelectedText}`;
        }
        let selected = '';
        const delimiter = this.delimiterText;

        selectedOptions.forEach((opt) => {
            const label = opt.getAttribute('label') ?? opt.innerText;
            selected += label + delimiter;
        });

        return selected.substring(0, selected.length - this.delimiterText.length);
    },
    /**
     * Updates the title of the button similar to the buttonText function.
     *
     * @param {Array<HTMLOptionElement>} options
     * @param {HTMLSelectElement} select
     * @returns {String}
     */
    buttonTitle: function (options, select) {
        if (options.length === 0) {
            return this.nonSelectedText;
        }

        let selected = '';
        const delimiter = this.delimiterText;

        options.forEach((opt) => {
            const label = opt.getAttribute('label') ?? opt.innerText;
            selected += label + delimiter;
        });
        return selected.substring(0, selected.length - this.delimiterText.length);
    },
    /**
     * @param {HTMLOptionElement} option
     * @returns {Boolean}
     */
    checkboxName: function (option) {
        return false; // no checkbox name
    },
    /**
     * Create a label.
     *
     * @param {HTMLOptionElement} element
     * @returns {String}
     */
    optionLabel: function (element) {
        return element.getAttribute('label') || element.innerText;
    },
    /**
     * Create a class.
     *
     * @param {HTMLOptionElement} element
     * @returns {String}
     */
    optionClass: function (element) {
        return element.getAttribute('class') || '';
    },
    /**
     * Triggered on change of the multiselect.
     *
     * Not triggered when selecting/deselecting options manually.
     *
     * @param {HTMLOptionElement} option
     * @param {Boolean} checked
     */
    onChange: function (option, checked) {

    },
    /**
     * Triggered when the dropdown is shown.
     * @param {Event} event show.bs.dropdown
     */
    onDropdownShow: function (event) {
    },
    /**
     * Triggered when the dropdown is hidden.
     *
     * @param {Event} event hide.bs.dropdown
     */
    onDropdownHide: function (event) {
    },
    /**
     * Triggered after the dropdown is shown.
     *
     * @param {Event} event shown.bs.dropdown
     */
    onDropdownShown: function (event) {
    },
    /**
     * Triggered after the dropdown is hidden.
     *
     * @param {Event} event hidden.bs.dropdown
     */
    onDropdownHidden: function (event) {
    },
    /**
     * Triggered on select all.
     * @param {Array<HTMLElement>}
     */
    onSelectAll: function (selectedOptions) {
    },
    /**
     * Triggered on deselect all.
     * @param {Array<HTMLElement>}
     */
    onDeselectAll: function (deselectedOptions) {
    },
    /**
     * Triggered after initializing.
     *
     * @param {HTMLSelectElement} select
     * @param {HTMLDivElement} container
     */
    onInitialized: function (select, container) {
    },
    /**
     * Triggered on filtering.
     *
     * @param {HTMLInputElement} filter
     */
    onFiltering: function (filter) {
    },
    enableHTML: false,
    buttonClass: 'custom-select',
    inheritClass: false,
    buttonWidth: 'auto',
    buttonContainer: '<div class="btn-group" />',
    dropRight: false,
    dropUp: false,
    selectedClass: 'active',
    // Maximum height of the dropdown menu.
    // If maximum height is exceeded a scrollbar will be displayed.
    maxHeight: null,
    includeSelectAllOption: false,
    includeSelectAllIfMoreThan: 0,
    selectAllText: ' Select all',
    selectAllValue: 'multiselect-all',
    selectAllName: false,
    selectAllNumber: true,
    selectAllJustVisible: true,
    enableFiltering: false,
    enableCaseInsensitiveFiltering: false,
    enableFullValueFiltering: false,
    enableClickableOptGroups: false,
    enableCollapsibleOptGroups: false,
    collapseOptGroupsByDefault: false,
    filterPlaceholder: 'Search',
    // possible options: 'text', 'value', 'both'
    filterBehavior: 'text',
    includeFilterClearBtn: true,
    preventInputChangeEvent: false,
    nonSelectedText: 'None selected',
    nSelectedText: 'selected',
    allSelectedText: 'All selected',
    resetButtonText: 'Reset',
    numberDisplayed: 3,
    disableIfEmpty: false,
    disabledText: '',
    delimiterText: ', ',
    includeResetOption: false,
    includeResetDivider: false,
    resetText: 'Reset',
    indentGroupOptions: true,
    // possible options: 'never', 'always', 'ifPopupIsSmaller', 'ifPopupIsWider'
    widthSynchronizationMode: 'never',
    // possible options: 'left', 'center', 'right'
    buttonTextAlignment: 'center',
    enableResetButton: false,
    templates: {
        button: '<button type="button" class="multiselect form-select dropdown-toggle" data-bs-toggle="dropdown"><span class="multiselect-selected-text"></span></button>',
        popupContainer: '<div class="multiselect-container dropdown-menu"></div>',
        filter: '<div class="multiselect-filter d-flex align-items-center"><i class="fas fa-sm fa-search text-body-secondary"></i><input type="search" class="multiselect-search form-control" /></div>',
        buttonGroup: '<div class="multiselect-buttons btn-group" style="display:flex;"></div>',
        buttonGroupReset: '<button type="button" class="multiselect-reset btn btn-secondary w-100"></button>',
        option: '<button type="button" class="multiselect-option dropdown-item"></button>',
        divider: '<div class="dropdown-divider"></div>',
        optionGroup: '<button type="button" class="multiselect-group dropdown-item"></button>',
        resetButton: '<div class="multiselect-reset text-center p-2"><button type="button" class="btn btn-sm w-100 btn-outline-secondary"></button></div>',
    },
};

class Multiselect {
    /** @prop {HTMLSelectElement} */
    #select = null;
    /** @prop {HTMLElement} */
    container = null;
    options = {};
    query = '';
    searchTimeout = null;
    lastToggledInput = null;
    multiselectId = '';
    /** @prop {HTMLElement} */
    button = null;
    /** @prop {HTMLElement} */
    popupContainer = null;
    /** @prop {HTMLElement} */
    filter = null;
    /** @prop {HTMLElement} */
    buttonGroupReset = null;
    /** @prop {Object} */
    defaultSelection = {};

    constructor(
        element,
        options,
    ) {
        if (!element) {
            return;
        }
        this.#select = element;
        this.options = mergeOptions(defaults, options, this.#select.dataset);
        this.setNonSelectedFromPlaceholder();
        this.multiselectId = generateUniqueId();
        this.options.multiple = this.#select.getAttribute('multiple') === 'multiple';

        this.options.onChange = this.options.onChange.bind(this);
        this.options.onSelectAll = this.options.onSelectAll.bind(this);
        this.options.onDeselectAll = this.options.onDeselectAll.bind(this);
        this.options.onDropdownShow = this.options.onDropdownShow.bind(this);
        this.options.onDropdownHide = this.options.onDropdownHide.bind(this);
        this.options.onDropdownShown = this.options.onDropdownShown.bind(this);
        this.options.onDropdownHidden = this.options.onDropdownHidden.bind(this);
        this.options.onInitialized = this.options.onInitialized.bind(this);
        this.options.onFiltering = this.options.onFiltering.bind(this);

        this.buildContainer();
        this.buildButton();
        this.buildDropdown();
        this.buildReset();
        this.buildSelectAll();
        this.buildDropdownOptions();
        this.buildFilter();
        this.buildButtons();

        this.updateButtonText();
        this.updateSelectAll(true);

        if (this.options.enableClickableOptGroups && this.options.multiple) {
            this.updateOptGroups();
        }

        this.options.wasDisabled = this.#select.disabled;
        if (this.options.disableIfEmpty && !this.#select.querySelector('option') && !this.options.wasDisabled) {
            this.disable(true);
        }

        wrap(this.#select).after(this.container);
        this.#select.setAttribute('tabindex', '-1');

        if (this.options.widthSynchronizationMode !== 'never') {
            this.synchronizeButtonAndPopupWidth();
        }

        this.#select.multiselect = this;
        this.options.onInitialized(this.#select, this.container);
    }

    setNonSelectedFromPlaceholder() {
        const placeholder = this.#select.getAttribute('placeholder');
        if (placeholder) {
            this.options.nonSelectedText = placeholder;
        }
    }

    buildContainer() {
        this.container = getElementFromString(this.options.buttonContainer);
        if (this.options.widthSynchronizationMode !== 'never') {
            this.container.addEventListener('show.bs.dropdown', () => {
                // the width needs to be synchronized again in case the width of the button changed in between
                this.synchronizeButtonAndPopupWidth();
                this.options.onDropdownShow();
            });
        } else {
            this.container.addEventListener('show.bs.dropdown', this.options.onDropdownShow);
        }
        this.container.addEventListener('hide.bs.dropdown', this.options.onDropdownHide);
        this.container.addEventListener('shown.bs.dropdown', this.options.onDropdownShown);
        this.container.addEventListener('hidden.bs.dropdown', this.options.onDropdownHidden);
    }

    /**
     * Builds the button of the multiselect.
     */
    buildButton() {
        this.button = getElementFromString(this.options.templates.button).classList.add(this.options.buttonClass);
        if (this.options.inheritClass) {
            this.#select.classList.forEach((cl) => {
                this.button.classList.add(cl);
            });
        }
        // Adopt active state.
        if (this.#select.disabled) {
            this.disable();
        } else {
            this.enable();
        }

        // Manually add button width if set.
        if (this.options.buttonWidth && this.options.buttonWidth !== 'auto') {
            this.button.style.width = '100%';
            this.container.style.width = this.options.buttonWidth;
        }

        switch (this.options.buttonTextAlignment) {
            case 'left':
                this.button.classList.add('text-start');
                break;
            case 'center':
                this.button.classList.add('text-center');
                break;
            case 'right':
                this.button.classList.add('text-end');
                break;
        }

        // Keep the tab index from the select.
        const tabindex = this.#select.getAttribute('tabindex');
        if (tabindex) {
            this.button.setAttribute('tabindex', tabindex);
        }

        this.container.prepend(this.button);
    }

    /**
     * Builds the popup container representing the dropdown menu.
     */
    buildDropdown() {
        // Build popup container.
        this.popupContainer = getElementFromString(this.options.templates.popupContainer);
        if (this.options.dropRight) {
            this.container.classList.add('dropend');
        } else if (this.options.dropUp) {
            this.container.classList.add('dropup');
        }

        // Set max height of dropdown menu to activate auto scrollbar.
        if (this.options.maxHeight) {
            // TODO: Add a class for this option to move the css declarations. (maybe use css variable)
            this.popupContainer.style.overflowX = 'hidden';
            this.popupContainer.style.overflowY = 'auto';
            // TODO: let the option set the units too. (backwards compatibility to pixels for bare ints)
            this.popupContainer.style.maxHeight = `${this.options.maxHeight}px`;
        }

        if (this.options.widthSynchronizationMode !== 'never') {
            this.popupContainer.style.overflowX = 'hidden';
        }

        this.popupContainer.addEventListener('touchstart', (e) => e.stopPropagation());
        this.popupContainer.addEventListener('click', (e) => e.stopPropagation());

        this.container.append(this.popupContainer);
    }

    synchronizeButtonAndPopupWidth() {
        if (!this.popupContainer || this.options.widthSynchronizationMode === 'never') {
            return;
        }

        const buttonWidth = this.button.offsetWidth;
        switch (this.options.widthSynchronizationMode) {
            case 'always':
                this.popupContainer.style.minWidth = buttonWidth;
                this.popupContainer.style.maxWidth = buttonWidth;
                break;
            case 'ifPopupIsSmaller':
                this.popupContainer.style.minWidth = buttonWidth;
                break;
            case 'ifPopupIsWider':
                this.popupContainer.style.maxWidth = buttonWidth;
                break;
        }
    }

    /**
     * Generate a unique identifier inside the multiselect namespace and adds it as an data attribute to the related element
     * @param {HTMLElement} relatedElement
     * @returns {String} unique id
     */
    createAndApplyUniqueId(relatedElement) {
        const id = `multiselect_${this.multiselectId}_${this.internalIdCount++}`;
        if (relatedElement) {
            relatedElement.dataset.multiselectid = id;
        }
        return id;
    }

    /**
     * Create a checkbox container with input and label based on given values
     * @param {HTMLElement} item
     * @param {String} label
     * @param {String} name
     * @param {String} value
     * @param {String} inputType
     * @returns {HTMLInputElement}
     */
    createCheckbox(item, labelContent, name, value, title, inputType, internalId) {
        const wrapper = document.createElement('span');
        wrapper.classList.add('form-check');

        const checkboxLabel = document.createElement('label');
        checkboxLabel.classList.add('form-check-label');
        if (this.options.enableHTML && labelContent.length > 0) {
            checkboxLabel.innerHTML = labelContent;
        } else {
            checkboxLabel.innerText = labelContent;
        }
        wrapper.append(checkboxLabel);

        const checkbox = document.createElement('input');
        checkbox.type = inputType;
        checkbox.classList.add('form-check-input');
        checkbox.value = value;
        wrapper.prepend(checkbox);

        if (internalId) {
            checkbox.id = internalId;
            checkboxLabel.setAttribute('for', internalId);
        }

        if (name) {
            checkbox.setAttribute('name', name);
        }

        item.prepend(wrapper);
        item.setAttribute('title', title || labelContent);

        return checkbox;
    }

    /**
     * Create an option using the given select option.
     *
     * @param {HTMLOptionElement} element
     */
    createOptionValue(element, isGroupOption) {
        // Support the label attribute on options.
        const label = this.options.optionLabel(element);
        const classes = this.options.optionClass(element);
        const value = element.value;
        const inputType = this.options.multiple ? 'checkbox' : 'radio';
        const title = element.getAttribute('title');

        const option = getElementFromString(this.options.templates.option);
        option.classList.add(...classes.split(' '));

        if (isGroupOption && this.options.indentGroupOptions) {
            if (this.options.enableCollapsibleOptGroups) {
                option.classList.add('multiselect-group-option-indented-full');
            } else {
                option.classList.add('multiselect-group-option-indented');
            }
        }

        // Hide all children items when collapseOptGroupsByDefault is true
        if (this.options.collapseOptGroupsByDefault && element.parentElement?.tagName.toLowerCase() === 'optgroup') {
            option.classList.add('multiselect-collapsible-hidden');
            option.hidden = true;
        }

        const name = this.options.checkboxName(element);
        const checkboxId = this.createAndApplyUniqueId(element);
        const checkbox = this.createCheckbox(option, label, name, value, title, inputType, checkboxId);

        const selected = element.selected || false;

        if (value === this.options.selectAllValue) {
            option.classList.add('multiselect-all');
            option.classList.remove('multiselect-option');
            checkbox.parent.parent
                .classList.add('multiselect-all');
        }

        this.popupContainer.append(option);

        if (element.disabled) {
            checkbox.disabled = true;
            checkbox.closest('.dropdown-item')
                .classList.add('disabled');
        }

        checkbox.checked = selected;

        if (selected && this.options.selectedClass) {
            checkbox.closest('.dropdown-item')
                ?.classList.add(this.options.selectedClass);
        }
    }

    /**
     * Creates a divider using the given select option.
     */
    createDivider() {
        const divider = getElementFromString(this.options.templates.divider);
        this.popupContainer.append(divider);
    }

    /**
     * Creates an optgroup.
     * @param {HTMLOptGroupElement} group
     */
    createOptgroup(group) {
        const label = group.getAttribute('label');
        const value = group.value;
        const title = group.getAttribute('title');

        let groupOption = document.createElement('span');
        groupOption.classList.add('multiselect-group', 'dropdown-item-text');

        if (this.options.enableClickableOptGroups && this.options.multiple) {
            groupOption = getElementFromString(this.options.templates.optionGroup);
            const checkboxId = this.createAndApplyUniqueId(group);
            this.createCheckbox(groupOption, label, null, value, title, 'checkbox', checkboxId);
        } else {
            if (this.options.enableHTML) {
                groupOption.innerHTML = ` ${label}`;
            } else {
                groupOption.innerText = ` ${label}`;
            }
        }

        const classes = this.options.optionClass(group);
        groupOption.classList.add(...classes.split(' '));

        if (this.options.enableCollapsibleOptGroups) {
            groupOption.querySelectorAll('.form-check').forEach((el) => {
                el.classList.add('d-inline-block');
            });
            groupOption.insertAdjacentHTML('afterbegin', '<span class="caret-container dropdown-toggle"></span>');
        }

        if (group.disabled) {
            groupOption.classList.add('disabled');
        }

        this.popupContainer.append(groupOption);

        group.querySelectorAll('option').forEach((el) => {
            this.createOptionValue(el, true);
        });
    }

    /**
     * Build the dropdown options and binds all necessary events.
     *
     * Uses createDivider and createOptionValue to create the necessary options.
     */
    buildDropdownOptions() {
        Array.from(this.#select.options).forEach((element) => {
            // Support optgroups and options without a group simultaneously.
            const tag = element.tagName.toLowerCase();

            if (element.value === this.options.selectAllValue) {
                return;
            }

            if (tag === 'optgroup') {
                this.createOptgroup(element);
            } else if (tag === 'option') {
                if (element.dataset.role === 'divider') {
                    this.createDivider();
                } else {
                    this.createOptionValue(element, false);
                }
            }
            // Other illegal tags will be ignored.
        });

        // Bind the change event on the dropdown elements.
        $(this.$popupContainer).off('change', '> *:not(.multiselect-group) input[type="checkbox"], > *:not(.multiselect-group) input[type="radio"]');
        $(this.$popupContainer).on('change', '> *:not(.multiselect-group) input[type="checkbox"], > *:not(.multiselect-group) input[type="radio"]', $.proxy(function (event) {
            var $target = $(event.target);

            var checked = $target.prop('checked') || false;
            var isSelectAllOption = $target.val() === this.options.selectAllValue;

            // Apply or unapply the configured selected class.
            if (this.options.selectedClass) {
                if (checked) {
                    $target.closest('.multiselect-option')
                        .addClass(this.options.selectedClass);
                } else {
                    $target.closest('.multiselect-option')
                        .removeClass(this.options.selectedClass);
                }
            }

            // Get the corresponding option.
            var id = $target.attr('id');
            var $option = this.getOptionById(id);

            var $optionsNotThis = $('option', this.$select).not($option);
            var $checkboxesNotThis = $('input', this.$container).not($target);

            if (isSelectAllOption) {
                if (checked) {
                    this.selectAll(this.options.selectAllJustVisible, true);
                } else {
                    this.deselectAll(this.options.selectAllJustVisible, true);
                }
            } else {
                if (checked) {
                    $option.prop('selected', true);

                    if (this.options.multiple) {
                        // Simply select additional option.
                        $option.prop('selected', true);
                    } else {
                        // Unselect all other options and corresponding checkboxes.
                        if (this.options.selectedClass) {
                            $($checkboxesNotThis).closest('.dropdown-item').removeClass(this.options.selectedClass);
                        }

                        $($checkboxesNotThis).prop('checked', false);
                        $optionsNotThis.prop('selected', false);

                        // It's a single selection, so close.
                        this.$button.click();
                    }

                    if (this.options.selectedClass === 'active') {
                        $optionsNotThis.closest('.dropdown-item').css('outline', '');
                    }
                } else {
                    // Unselect option.
                    $option.prop('selected', false);
                }

                // To prevent select all from firing onChange: #575
                this.options.onChange($option, checked);

                // Do not update select all or optgroups on select all change!
                this.updateSelectAll();

                if (this.options.enableClickableOptGroups && this.options.multiple) {
                    this.updateOptGroups();
                }
            }

            this.$select.change();
            this.updateButtonText();

            if (this.options.preventInputChangeEvent) {
                return false;
            }
        }, this));

        $('.multiselect-option', this.$popupContainer).off('mousedown');
        $('.multiselect-option', this.$popupContainer).on('mousedown', function (e) {
            if (e.shiftKey) {
                // Prevent selecting text by Shift+click
                return false;
            }
        });

        $(this.$popupContainer).off('touchstart click', '.multiselect-option, .multiselect-all, .multiselect-group');
        $(this.$popupContainer).on('touchstart click', '.multiselect-option, .multiselect-all, .multiselect-group', $.proxy(function (event) {
            event.stopPropagation();

            var $target = $(event.target);

            if (event.shiftKey && this.options.multiple) {
                if (!$target.is('input')) { // Handles checkbox selection manually (see https://github.com/davidstutz/bootstrap-multiselect/issues/431)
                    event.preventDefault();
                    $target = $target.closest('.multiselect-option').find('input');
                    $target.prop('checked', !$target.prop('checked'));
                }
                var checked = $target.prop('checked') || false;

                if (this.lastToggledInput !== null && this.lastToggledInput !== $target) { // Make sure we actually have a range
                    var from = this.$popupContainer.find('.multiselect-option:visible').index($target.closest('.multiselect-option'));
                    var to = this.$popupContainer.find('.multiselect-option:visible').index(this.lastToggledInput.closest('.multiselect-option'));

                    if (from > to) { // Swap the indices
                        var tmp = to;
                        to = from;
                        from = tmp;
                    }

                    // Make sure we grab all elements since slice excludes the last index
                    ++to;

                    // Change the checkboxes and underlying options
                    var range = this.$popupContainer.find('.multiselect-option:not(.multiselect-filter-hidden)').slice(from, to).find('input');

                    range.prop('checked', checked);

                    if (this.options.selectedClass) {
                        range.closest('.multiselect-option')
                            .toggleClass(this.options.selectedClass, checked);
                    }

                    for (var i = 0, j = range.length; i < j; i++) {
                        var $checkbox = $(range[i]);

                        var $option = this.getOptionById($checkbox.attr('id'));

                        $option.prop('selected', checked);
                    }
                }

                // Trigger the select "change" event
                $target.trigger('change');
            } else if (!$target.is('input')) {
                var $checkbox = $target.closest('.multiselect-option, .multiselect-all').find('.form-check-input');
                if ($checkbox.length > 0) {
                    if (this.options.multiple || !$checkbox.prop('checked')) {
                        $checkbox.prop('checked', !$checkbox.prop('checked'));
                        $checkbox.change();
                    }
                } else if (this.options.enableClickableOptGroups && this.options.multiple && !$target.hasClass('caret-container')) {
                    var groupItem = $target;
                    if (!groupItem.hasClass('multiselect-group')) {
                        groupItem = $target.closest('.multiselect-group');
                    }
                    $checkbox = groupItem.find('.form-check-input');
                    if ($checkbox.length > 0) {
                        $checkbox.prop('checked', !$checkbox.prop('checked'));
                        $checkbox.change();
                    }
                }

                event.preventDefault();
            }

            // Remembers last clicked option
            var $input = $target.closest('.multiselect-option').find('input[type=\'checkbox\'], input[type=\'radio\']');
            if ($input.length > 0) {
                this.lastToggledInput = $target;
            } else {
                this.lastToggledInput = null;
            }

            $target.blur();
        }, this));

        // Keyboard support.
        this.$container.off('keydown.multiselect').on('keydown.multiselect', $.proxy(function (event) {
            var $items = $(this.$container).find('.multiselect-option:not(.disabled), .multiselect-group:not(.disabled), .multiselect-all').filter(':visible');
            var index = $items.index($items.filter(':focus'));
            var $search = $('.multiselect-search', this.$container);

            // keyCode 9 == Tab
            if (event.keyCode === 9 && this.$container.hasClass('show')) {
                this.$button.click();
            }
            // keyCode 13 = Enter
            else if (event.keyCode == 13) {
                var $current = $items.eq(index);
                setTimeout(function () {
                    $current.focus();
                }, 1);
            }
            // keyCode 38 = Arrow Up
            else if (event.keyCode == 38) {
                if (index == 0 && !$search.is(':focus')) {
                    setTimeout(function () {
                        $search.focus();
                    }, 1);
                }
            }
            // keyCode 40 = Arrow Down
            else if (event.keyCode == 40) {
                if ($search.is(':focus')) {
                    var $first = $items.eq(0);
                    setTimeout(function () {
                        $search.blur();
                        $first.focus();
                    }, 1);
                } else if (index == -1) {
                    setTimeout(function () {
                        $search.focus();
                    }, 1);
                }
            }
        }, this));

        if (this.options.enableClickableOptGroups && this.options.multiple) {

            $('.multiselect-group input', this.$popupContainer).on('change', $.proxy(function (event) {
                // #handleClickableGroups
            }, this));
        }

        if (this.options.enableCollapsibleOptGroups) {
            const clickableSelector = this.options.enableClickableOptGroups
                ? '.multiselect-group .caret-container'
                : '.multiselect-group';

            this.popupContainer.querySelectorAll(clickableSelector).forEach((el) => {
                el.addEventListener('click', (ev) => {
                    this.#handleCollapsibleGroups(ev);
                });
            });
        }
    }

    #handleClickableGroups(event) {
        event.stopPropagation();

        const target = event.target;
        const checked = target.checked || false;

        const item = target.closest('.dropdown-item');

        // TODO write method to handle this
        const $group = $item.nextUntil('.multiselect-group')
            .not('.multiselect-filter-hidden')
            .not('.disabled');

        const $inputs = $group.find('input');

        const $options = [];

        if (this.options.selectedClass) {
            if (checked) {
                $item.addClass(this.options.selectedClass);
            } else {
                $item.removeClass(this.options.selectedClass);
            }
        }

        $.each($inputs, $.proxy(function (index, input) {
            const $input = $(input);
            const id = $input.attr('id');
            const $option = this.getOptionById(id);

            if (checked) {
                $input.prop('checked', true);
                $input.closest('.dropdown-item')
                    .addClass(this.options.selectedClass);

                $option.prop('selected', true);
            } else {
                $input.prop('checked', false);
                $input.closest('.dropdown-item')
                    .removeClass(this.options.selectedClass);

                $option.prop('selected', false);
            }

            $options.push($option);
        }, this));

        // Cannot use select or deselect here because it would call updateOptGroups again.

        this.options.onChange($options, checked);

        this.$select.change();
        this.updateButtonText();
        this.updateSelectAll();
    }

    /**
     * Collapse/expand groups
     * @param {ClickEvent} event
     */
    #handleCollapsibleGroups(event) {
        const group = event.target.closest('.multiselect-group');
        const options = [];
        let sibling = group.nextElementSibling;
        while (sibling) {
            if (sibling.classList.contains('.multiselect-group')) {
                break;
            }
            if (
                !sibling.classList.contains('multiselect-filter-hidden')
            ) {
                options.push(sibling);
            }
            sibling = sibling.nextElementSibling;
        }

        let visible = true;
        options.forEach((opt) => {
            visible = visible && !opt.classList.contains('multiselect-collapsible-hidden');
        });

        options.forEach((opt) => {
            if (visible) {
                opt.hidden = true;
                opt.classList.add('multiselect-collapsible-hidden');
                return;
            }
            opt.hidden = false;
            opt.classList.remove('multiselect-collapsible-hidden');
        });

        if (visible) {
            group.classList.add('closed');
        } else {
            group.classList.remove('closed');
        }
    }

    /**
     * Build the reset.
     */
    buildReset() {
        if (!this.options.includeResetOption) {
            return;
        }
        // Check whether to add a divider after the reset.
        if (this.options.includeResetDivider) {
            const divider = getElementFromString(this.options.templates.divider);
            divider.classList.add('mt-0');
            this.popupContainer.prepend(divider);
        }

        const resetButtonDiv = getElementFromString(this.options.templates.resetButton);
        const resetButton = resetButtonDiv.querySelector('button');

        if (resetButton && this.options.enableHTML) {
            resetButton.innerHTML = this.options.resetText;
        } else if (resetButton) {
            resetButton.innerText = this.options.resetText;
        }

        resetButton.addEventListener('click', () => {
            this.clearSelection();
        });

        this.popupContainer.prepend(resetButtonDiv);
    }

    /**
     * Checks whether a select all checkbox is present.
     * @returns {Boolean}
     */
    hasSelectAll() {
        return this.popupContainer.querySelector('.multiselect-all') !== null;
    }

    /**
     * Build the select all.
     * Checks if a select all has already been created.
     */
    buildSelectAll() {
        if (typeof this.options.selectAllValue === 'number') {
            this.options.selectAllValue = this.options.selectAllValue.toString();
        }

        if (this.hasSelectAll()
            || !this.options.includeSelectAllOption
            || !this.options.multiple
            || this.#select.querySelectorAll('option').length <= this.options.includeSelectAllIfMoreThan
        ) {
            return;
        }

        // Check whether to add a divider after the select all.
        if (this.options.includeSelectAllDivider) {
            this.popupContainer.prepend(getElementFromString(this.options.templates.divider));
        }

        const option = getElementFromString(this.options.templates.li || this.options.templates.option);
        const checkbox = this.createCheckbox(option, this.options.selectAllText, this.options.selectAllName,
            this.options.selectAllValue, this.options.selectAllText, 'checkbox', this.createAndApplyUniqueId(null));

        option.classList.add('multiselect-all');
        option.classList.remove('multiselect-option');
        option.querySelector('.form-check-label')?.classList.add('font-weight-bold');

        this.popupContainer.prepend(option);

        checkbox.checked = false;
    }

    handleFilterTyping(event) {
        // Cancel enter key default behaviour
        if (event.which === 13) {
            event.preventDefault();
        }

        if (this.isFirefox() && this.options.includeFilterClearBtn) {
            if (event.target.value) {
                this.filter.find('.multiselect-moz-clear-filter').hidden = false;
            } else {
                this.filter.find('.multiselect-moz-clear-filter').hidden = true;
            }
        }

        // This is useful to catch "keydown" events after the browser has updated the control.
        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(() => {
            if (this.query !== event.target.value) {
                this.query = event.target.value;
                if (this.options.enableCaseInsensitiveFiltering) {
                    this.query = this.query.toLowerCase();
                }

                let currentGroup, currentGroupVisible;
                this.popupContainer.querySelectorAll('.multiselect-option, .multiselect-group').forEach((element) => {
                    const value = element.querySelector('input')?.value ?? '';
                    const text = element.querySelector('.form-check-label')?.innerText ?? '';
                    if (value === this.options.selectAllValue || !text) {
                        return;
                    }

                    let filterCandidate = '';
                    if ((this.options.filterBehavior === 'text')) {
                        filterCandidate = text;
                    } else if ((this.options.filterBehavior === 'value')) {
                        filterCandidate = value;
                    } else if (this.options.filterBehavior === 'both') {
                        filterCandidate = text + '\n' + value;
                    }

                    // By default lets assume that element is not
                    // interesting for this search.
                    let showElement = false;

                    if (this.options.enableCaseInsensitiveFiltering) {
                        filterCandidate = filterCandidate.toLowerCase();
                    }

                    if (this.options.enableFullValueFiltering && this.options.filterBehavior !== 'both') {
                        const valueToMatch = filterCandidate.trim().substring(0, this.query.length);
                        if (this.query.indexOf(valueToMatch) > -1) {
                            showElement = true;
                        }
                    } else if (filterCandidate.indexOf(this.query) > -1) {
                        showElement = true;
                    }

                    // Toggle current element (group or group item) according to showElement boolean.
                    if (!showElement) {
                        element.hidden = true;
                        element.classList.add('multiselect-filter-hidden');
                    } else {
                        element.hidden = false;
                        element.classList.remove('multiselect-filter-hidden');
                    }

                    // Differentiate groups and group items.
                    if (element.classList.contains('multiselect-group')) {
                        // Remember group status.
                        currentGroup = element;
                        currentGroupVisible = showElement;
                    } else {
                        // Show group name when at least one of its items is visible.
                        if (showElement) {
                            currentGroup.hidden = false;
                            currentGroup.classList.remove('multiselect-filter-hidden');
                        }

                        // Show all group items when group name satisfies filter.
                        if (!showElement && currentGroupVisible) {
                            element.hidden = false;
                            element.classList.remove('multiselect-filter-hidden');
                        }
                    }
                });
            }

            this.updateSelectAll();

            if (this.options.enableClickableOptGroups && this.options.multiple) {
                this.updateOptGroups();
            }

            this.options.onFiltering(event.target);
        }, 300);
    }

    /**
     * Builds the filter.
     */
    buildFilter() {
        // Build filter if filtering OR case insensitive filtering is enabled and the number of options exceeds (or equals) enableFilterLength.
        if (!this.options.enableFiltering
            || !this.options.enableCaseInsensitiveFiltering
        ) {
            return;
        }
        const enableFilterLength = Math.max(this.options.enableFiltering, this.options.enableCaseInsensitiveFiltering);

        if (this.#select.querySelectorAll('option').length < enableFilterLength) {
            return;
        }
        this.filter = getElementFromString(this.options.templates.filter);
        this.filter.querySelector('input')?.setAttribute('placeholder', this.options.filterPlaceholder);

        // Handles optional filter clear button
        if (!this.options.includeFilterClearBtn) {
            this.filter.querySelector('.multiselect-search')?.setAttribute('type', 'text');

            // Remove clear button if the old design of the filter with input groups and separated clear button is used
            this.filter.querySelector('.multiselect-clear-filter')?.remove();
        } else {
            // Firefox does not support a clear button in search inputs right now therefore it must be added manually
            if (this.isFirefox() && !this.filter.querySelector('.multiselect-clear-filter')) {
                this.filter.append('<i class=\'fas fa-times text-body-secondary multiselect-clear-filter multiselect-moz-clear-filter\'></i>');
            }

            this.filter.querySelector('.multiselect-clear-filter')?.addEventListener('click', () => {
                clearTimeout(this.searchTimeout);

                this.query = '';
                this.filter.querySelector('.multiselect-search').value = '';
                this.popupContainer.querySelectorAll('.dropdown-item').forEach((el) => {
                    el.hidden = false;
                    el.classList.remove('multiselect-filter-hidden');
                });

                this.updateSelectAll();

                if (this.options.enableClickableOptGroups && this.options.multiple) {
                    this.updateOptGroups();
                }
            });
        }

        this.popupContainer.prepend(this.filter);

        this.filter.value = this.query;
        this.filter.addEventListener('click', (event) => {
            event.stopPropagation();
        });
        this.filter.addEventListener('input', (ev) => {
            this.handleFilterTyping(ev);
        });
        this.filter.addEventListener('keydown', (ev) => {
            this.handleFilterTyping(ev);
        });
    }

    /**
     * Builds the buttons.
     */
    buildButtons() {
        if (!this.options.enableResetButton) {
            return;
        }
        const buttonGroup = getElementFromString(this.options.templates.buttonGroup);
        this.buttonGroupReset = getElementFromString(this.options.templates.buttonGroupReset);
        this.buttonGroupReset.innerText = this.options.resetButtonText;
        buttonGroup.append(this.buttonGroupReset);
        this.popupContainer.prepend(buttonGroup);

        // We save all options that were previously selected.
        this.defaultSelection = {};
        this.#select.querySelectorAll('option').forEach((element) => {
            this.defaultSelection[element.value] = element.selected;
        });

        this.buttonGroupReset.addEventListener('click', () => {
            this.#select.querySelectorAll('option').forEach((element) => {
                element.selected = this.defaultSelection[element.value] ?? false;
            });
            this.refresh();

            if (this.options.enableFiltering) {
                const keyev = new KeyboardEvent('keydown');
                this.filter.dispatchEvent(keyev);
                this.filter.querySelector('input').value = '';
            }
        });
    }

    /**
     * Unbinds the whole plugin.
     */
    destroy() {
        this.container.remove();
        unwrap(this.#select);
        this.#select.hidden = false;

        // reset original state
        this.#select.disabled = this.options.wasDisabled;
        this.#select.querySelectorAll('option, optgroup').forEach((el) => {
            el.removeAttribute('data-multiselectid');
        });
    }

    /**
     * Refreshs the multiselect based on the selected options of the select.
     */
    refresh() {
        const inputs = {};
        this.popupContainer.querySelectorAll('.multiselect-option input').forEach((el) => {
            inputs[el.value] = el;
        });

        this.#select.querySelectorAll('option').forEach((elem) => {
            const input = inputs[elem.value];

            if (elem.selected) {
                input.checked = true;
                if (this.options.selectedClass) {
                    input.closest('.multiselect-option')
                        .classList.add(this.options.selectedClass);
                }
            } else {
                input.checked = false;

                if (this.options.selectedClass) {
                    input.closest('.multiselect-option')
                        .classList.remove(this.options.selectedClass);
                }
            }

            if (elem.disabled) {
                input.disabled = true;
                input.closest('.multiselect-option')
                    .classList.add('disabled');
            } else {
                input.disabled = false;
                input.closest('.multiselect-option')
                    .classList.remove('disabled');
            }
        });

        this.updateButtonText();
        this.updateSelectAll();

        if (this.options.enableClickableOptGroups && this.options.multiple) {
            this.updateOptGroups();
        }
    }

    /**
     * Get the input (radio/checkbox) by its value.
     * @param {String} value
     * @returns {Array<HTMLInputElement>}
     */
    getInputsByValue(value) {
        const checkboxes = this.popupContainer.querySelectorAll('.multiselect-option input:not(.multiselect-search)');
        const valueToCompare = value.toString();

        const matchingCheckboxes = [];
        for (let i = 0; i < checkboxes.length; i = i + 1) {
            const checkbox = checkboxes[i];
            if (checkbox.value === valueToCompare) {
                matchingCheckboxes.push(checkbox);
            }
        }

        return matchingCheckboxes;
    }

    /**
     * Gets a select option by its id
     * @param {String} id
     * @returns {HTMLOptionElement|HTMLOptGroupElement|null}
     */
    getOptionById(id) {
        if (!id) {
            return null;
        }

        return this.#select.querySelector(`option[data-multiselectid="${id}"], optgroup[data-multiselectid="${id}"]`);
    }

    /**
     * Select all options of the given values.
     *
     * If triggerOnChange is set to true, the on change event is triggered if
     * and only if one value is passed.
     *
     * @param {Array} selectValues
     * @param {Boolean} triggerOnChange
     */
    select(selectValues, triggerOnChange) {
        if (!Array.isArray(selectValues)) {
            selectValues = [selectValues];
        }

        for (var i = 0; i < selectValues.length; i++) {
            const value = selectValues[i];
            if (value === null || value === undefined) {
                continue;
            }
            const checkboxes = this.getInputsByValue(value);
            if (checkboxes.length === 0) {
                continue;
            }

            for (let checkboxIndex = 0; checkboxIndex < checkboxes.length; ++checkboxIndex) {
                const checkbox = checkboxes[checkboxIndex];

                const option = this.getOptionById(checkbox.id);
                if (!option) {
                    continue;
                }

                if (this.options.selectedClass) {
                    checkbox.closest('.dropdown-item')
                        ?.classList.add(this.options.selectedClass);
                }

                checkbox.checked = true;
                option.selected = true;

                if (!this.options.multiple) {
                    this.container.querySelectorAll('input[type="checkbox"]').forEach((el) => {
                        if (el === checkbox) {
                            return;
                        }
                        el.checked = false;
                        // TODO could this active class be replaced with a css has on the checked input?
                        el.closest('.multiselect-option')?.classList.remove('active');
                    });

                    this.#select.querySelectorAll('option').forEach((el) => {
                        if (el === option) {
                            return;
                        }
                        option.selected = false;
                    });
                }

                if (triggerOnChange) {
                    this.options.onChange(option, true);
                }
            }
        }

        this.updateButtonText();
        this.updateSelectAll();

        if (this.options.enableClickableOptGroups && this.options.multiple) {
            this.updateOptGroups();
        }
    }

    /**
     * Clears all selected items.
     */
    clearSelection() {
        this.deselectAll(false);
        this.updateButtonText();
        this.updateSelectAll();

        if (this.options.enableClickableOptGroups && this.options.multiple) {
            this.updateOptGroups();
        }
    }

    /**
     * Deselects all options of the given values.
     *
     * If triggerOnChange is set to true, the on change event is triggered, if
     * and only if one value is passed.
     *
     * @param {Array} deselectValues
     * @param {Boolean} triggerOnChange
     */
    deselect(deselectValues, triggerOnChange) {
        if (!this.options.multiple) {
            // In single selection mode at least on option needs to be selected
            return;
        }

        if (!Array.isArray(deselectValues)) {
            deselectValues = [deselectValues];
        }

        for (let i = 0; i < deselectValues.length; i++) {
            const value = deselectValues[i];

            if (value === null || value === undefined) {
                continue;
            }

            const checkboxes = this.getInputsByValue(value);
            if (checkboxes.length === 0) {
                continue;
            }

            for (let checkboxIndex = 0; checkboxIndex < checkboxes.length; ++checkboxIndex) {
                const checkbox = checkboxes[checkboxIndex];
                const option = this.getOptionById(checkbox.id);
                if (!option) {
                    continue;
                }

                if (this.options.selectedClass) {
                    checkbox.closest('.dropdown-item')
                        ?.classList.remove(this.options.selectedClass);
                }

                checkbox.checked = false;
                option.selected = false;

                if (triggerOnChange) {
                    this.options.onChange(option, false);
                }
            }
        }

        this.updateButtonText();
        this.updateSelectAll();

        if (this.options.enableClickableOptGroups && this.options.multiple) {
            this.updateOptGroups();
        }
    }

    /**
     * Selects all enabled & visible options.
     *
     * If justVisible is true, only visible options are selected.
     *
     * @param {Boolean} justVisible
     * @param {Boolean} triggerOnSelectAll
     */
    selectAll(justVisible = true, triggerOnSelectAll = false) {
        if (!this.options.multiple) {
            // In single selection mode only one option can be selected at a time
            return;
        }

        // Record all changes, i.e., options selected that were not selected before.
        const selected = [];
        const options = justVisible
            ? this.popupContainer.querySelectorAll('.multiselect-option:not(.disabled):not(.multiselect-filter-hidden)')
            : this.popupContainer.querySelectorAll('.multiselect-option:not(.disabled)');
        options.forEach((el) => {
            el.classList.add(this.options.selectedClass);
            const input = el.querySelector('input:enabled');
            if (!input) {
                return;
            }
            input.checked = true;
            const option = this.getOptionById(input.id);
            if (!option) {
                return;
            }
            if (!option.selected) {
                selected.push(option);
            }
            option.selected = true;
        });

        const selectAll = this.popupContainer.querySelector(`.multiselect-option input[value="${this.options.selectAllValue}"]`);
        if (selectAll) {
            selectAll.checked = true;
        }

        if (this.options.enableClickableOptGroups && this.options.multiple) {
            this.updateOptGroups();
        }

        this.updateButtonText();
        this.updateSelectAll();

        if (triggerOnSelectAll) {
            this.options.onSelectAll(selected);
        }
    }

    /**
     * Deselects all options.
     *
     * If justVisible is true, only visible options are deselected.
     *
     * @param {Boolean} justVisible
     */
    deselectAll(justVisible = true, triggerOnDeselectAll = false) {
        if (!this.options.multiple) {
            // In single selection mode at least on option needs to be selected
            return;
        }

        // Record changes, i.e., those options that are deselected but were not deselected before.
        const deselected = [];
        const options = justVisible
            ? this.popupContainer.querySelectorAll('.multiselect-option:not(.disabled):not(.multiselect-filter-hidden)')
            : this.popupContainer.querySelectorAll('.multiselect-option:not(.disabled):not(.multiselect-group)');
        options.forEach((el) => {
            el.classList.remove(this.options.selectedClass);
            const input = el.querySelector('input:enabled');
            if (!input) {
                return;
            }
            input.checked = false;
            const option = this.getOptionById(input.id);
            if (!option) {
                return;
            }
            if (option.selected) {
                deselected.push(option);
            }
            option.selected = false;
        });

        const selectAll = this.popupContainer.querySelector(`.multiselect-option input[value="${this.options.selectAllValue}"]`);
        if (selectAll) {
            selectAll.checked = false;
        }

        if (this.options.enableClickableOptGroups && this.options.multiple) {
            this.updateOptGroups();
        }

        this.updateButtonText();
        this.updateSelectAll();

        if (triggerOnDeselectAll) {
            this.options.onDeselectAll(deselected);
        }
    }

    /**
     * Rebuild the plugin.
     *
     * Rebuilds the dropdown, the filter and the select all option.
     */
    rebuild() {
        this.internalIdCount = 0;

        this.popupContainer.innerHTML = '';
        this.#select.querySelectorAll('option, optgroup').forEach((el) => {
            el.removeAttribute('data-multiselectid');
        });
        // Important to distinguish between radios and checkboxes.
        this.options.multiple = this.#select.getAttribute('multiple') === 'multiple';

        this.buildSelectAll();
        this.buildDropdownOptions();
        this.buildFilter();
        this.buildButtons();

        this.updateButtonText();
        this.updateSelectAll(true);

        if (this.options.enableClickableOptGroups && this.options.multiple) {
            this.updateOptGroups();
        }

        if (this.options.disableIfEmpty) {
            if (this.#select.querySelectorAll('option').length <= 0) {
                if (!this.#select.disabled) {
                    this.disable(true);
                }
            } else if (this.#select.dataset['disabled-by-option']) {
                this.enable();
            }
        }

        if (this.options.dropRight) {
            this.container.classList.add('dropend');
        } else if (this.options.dropUp) {
            this.container.classList.add('dropup');
        }

        if (this.options.widthSynchronizationMode !== 'never') {
            this.synchronizeButtonAndPopupWidth();
        }
    }

    /**
     * The provided data will be used to build the dropdown.
     * @param {Array<Object>} data  Data about options to build
     */
    dataprovider(data) {
        let groupCounter = 0;
        this.#select.innerHTML = '';

        data.forEach((option) => {
            let tag;

            if (Array.isArray(option.children)) { // create optiongroup tag
                groupCounter++;
                tag = document.createElement('optgroup');
                tag.setAttribute('label', option.label ?? `Group ${groupCounter}`);
                tag.disabled = !!option.disabled;
                tag.value = option.value;

                option.children.forEach((subOption) => { // add children option tags
                    const attributes = [];
                    // Loop through attributes object and add key-value for each attribute
                    for (var key in subOption.attributes) {
                        attributes.push(`data-${key}="${subOption.attributes[key]}"`);
                    }

                    const optTag = `<option ${subOption.value ? `value="${subOption.value}"` : ''} ${subOption.selected ? 'selected=selected' : ''} ${subOption.disabled ? 'disabled' : ''} ${attributes.join('')}>${subOption.label}</option>`;

                    tag.innerHTML = tag.innerHTML + optTag;
                });
            } else {
                const attributes = [];
                // Loop through attributes object and add key-value for each attribute
                for (var key in option.attributes) {
                    attributes.push(`data-${key}="${option.attributes[key]}"`);
                }

                const optTag = `<option ${option.value ? `value="${option.value}"` : ''} ${option.selected ? 'selected=selected' : ''} ${option.disabled ? 'disabled' : ''} ${attributes.join('')}>${option.label}</option>`;

                tag.innerHTML = tag.innerHTML + optTag;
            }

            this.#select.append(tag);
        });

        this.rebuild();
    }

    enable() {
        this.#select.disabled = false;
        this.button.disabled = false;
        this.button.classList.remove('disabled');

        this.updateButtonText();
    }

    /**
     * Disable the multiselect.
     */
    disable(disableByOption) {
        this.#select.disabled = true;
        this.button.disabled = true;
        this.button.classList.add('disabled');

        if (disableByOption) {
            this.#select.dataset['disabled-by-option'] = 'true';
        } else {
            this.#select.removeAttribute('data-disabled-by-option');
        }

        this.updateButtonText();
    }

    updateOptGroups() {
        const groups = this.popupContainer.querySelectorAll('.multiselect-group');
        const selectedClass = this.options.selectedClass;

        groups.forEach((el) => {
            const options = [];
            // get all options that are not disabled/hidden
            // until the next group starts
            let sibling = el.nextElementSibling;
            while (sibling) {
                if (sibling.classList.contains('.multiselect-group')) {
                    break;
                }
                if (
                    !sibling.classList.contains('multiselect-filter-hidden')
                    && !sibling.classList.contains('disabled')
                ) {
                    options.push(sibling);
                }
                sibling = sibling.nextElementSibling;
            }

            // if all options are checked, then group will be checked
            let checked = true;
            options.forEach((opt) => {
                const input = opt.querySelector('input');
                if (!input.checked) {
                    checked = false;
                }
            });

            if (selectedClass) {
                if (checked) {
                    el.classList.add(selectedClass);
                } else {
                    el.classList.remove(selectedClass);
                }
            }

            el.querySelector('input').checked = checked;
        });
    }

    /**
     * Updates the select all checkbox based on the currently displayed and selected checkboxes.
     */
    updateSelectAll() {
        if (!this.hasSelectAll()) {
            return;
        }
        const allBoxes = this.popupContainer.querySelectorAll('.multiselect-option:not(.multiselect-filter-hidden):not(.multiselect-group):not(.disabled) input:enabled');
        const checkedBoxesLength = Array.from(allBoxes).filter((el) => {
            return el.checked;
        }).length;
        const selectAllItem = this.popupContainer.querySelector('.multiselect-all');
        const selectAllInput = selectAllItem.querySelector('input');

        if (checkedBoxesLength > 0 && checkedBoxesLength === allBoxes.length) {
            selectAllInput.checked = true;
            selectAllItem.classList.add(this.options.selectedClass);
        } else {
            selectAllInput.checked = false;
            selectAllItem.classList.remove(this.options.selectedClass);
        }
    }

    /**
     * Update the button text and its title based on the currently selected options.
     */
    updateButtonText() {
        const options = this.getSelected();

        // First update the displayed button text.
        const btn = this.container.querySelector('.multiselect .multiselect-selected-text');
        if (btn && this.options.enableHTML) {
            btn.innerHTML = this.options.buttonText(options, this.#select);
        } else if (btn) {
            btn.innerText = this.options.buttonText(options, this.#select);
        }

        // Now update the title attribute of the button.
        this.container.querySelector('.multiselect')?.setAttribute('title', this.options.buttonTitle(options, this.#select));
        const evt = new Event('change');
        this.button.dispatchEvent(evt);
    }

    /**
     * Get all selected options.
     *
     * @returns {Array<HTMLOptionElement>}
     */
    getSelected() {
        return Array.from(this.#select.querySelectorAll('option[selected]'));
    }

    setAllSelectedText(allSelectedText) {
        this.options.allSelectedText = allSelectedText;
        this.updateButtonText();
    }

    isFirefox() {
        const firefoxIdentifier = 'firefox';
        if (navigator && navigator.userAgent) {
            return navigator.userAgent.toLocaleLowerCase().indexOf(firefoxIdentifier) > -1;
        }
        return false;
    }
}

export default Multiselect;
