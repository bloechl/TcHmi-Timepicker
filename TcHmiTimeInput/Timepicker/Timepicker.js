// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.48/runtimes/native1.12-tchmi/TcHmi.d.ts" />

/*
 * Generated 25.11.2023 14:01:09
 * Copyright (C) 2023
 */
var TcHmi;
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    let Controls;
    (function (/** @type {globalThis.TcHmi.Controls} */ Controls) {
        let TcHmiTimeInput;
        (function (TcHmiTimeInput) {
            class Timepicker extends TcHmi.Controls.Beckhoff.TcHmiInput {

                /*
                Attribute philosophy
                --------------------
                - Local variables are not set in the class definition, so they have the value 'undefined'.
                - During compilation, the Framework sets the value that is specified in the HTML or in the theme (possibly 'null') via normal setters.
                - Because of the "changed detection" in the setter, the value is only processed once during compilation.
                - Attention: If we have a Server Binding on an Attribute, the setter will be called once with null to initialize and later with the correct value.
                */

                /**
                 * Constructor of the control
                 * @param {JQuery} element Element from HTML (internal, do not use)
                 * @param {JQuery} pcElement precompiled Element (internal, do not use)
                 * @param {TcHmi.Controls.ControlAttributeList} attrs Attributes defined in HTML in a special format (internal, do not use)
                 * @returns {void}
                 */
                constructor(element, pcElement, attrs) {
                    /** Call base class constructor */
                    super(element, pcElement, attrs);
                    this.__time;
                }
                /**
                 * Raised after the control was added to the control cache and the constructors of all base classes were called.
                 */
                __previnit() {
                    // Fetch template root element
                    this.__elementTemplateRoot = this.__element.find('.TcHmi_Controls_TcHmiTimeInput_Timepicker-Template');
                    if (this.__elementTemplateRoot.length === 0) {
                        throw new Error('Invalid Template.html');
                    }

                    this.__timeInp = this.__elementTemplateRoot.find('.TcHmi_Controls_Beckhoff_TcHmiTimeInput-template-Timepicker');
                    if (this.__timeInp.length === 0) {
                        throw new Error('Invalid Template.html');
                    }

                    // Call __previnit of base class
                    super.__previnit();
                }
                /**
                 * Is called during control initialization after the attribute setters have been called. 
                 * @returns {void}
                 */
                __init() {
                    super.__init();
                }
                /**
                 * Is called by the system after the control instance is inserted into the active DOM.
                 * Is only allowed to be called from the framework itself!
                 */
                __attach() {
                    super.__attach();
                    /**
                     * Initialize everything which is only available while the control is part of the active dom.
                     */

                    this.__onUserInteractionFinishedEvent = TcHmi.EventProvider.register(this.__id + '.onUserInteractionFinished', this.__onUserInteractionFinished())

                }
                /**
                 * Is called by the system when the control instance is no longer part of the active DOM.
                 * Is only allowed to be called from the framework itself!
                 */
                __detach() {
                    super.__detach();

                    /**
                     * Disable everything that is not needed while the control is not part of the active DOM.
                     * For example, there is usually no need to listen for events!
                     */

                    this.__onUserInteractionFinishedEvent = null;
                }
                /**
                 * Destroy the current control instance.
                 * Will be called automatically if the framework destroys the control instance!
                 */
                destroy() {
                    /**
                     * Ignore while __keepAlive is set to true.
                     */
                    if (this.__keepAlive) {
                        return;
                    }
                    super.destroy();
                    /**
                     * Free resources like child controls etc.
                     */
                }
                __onUserInteractionFinished() {
                    return (evt) => {
                        this.setTime(this.__timeInp.val());
                    }
                }


                // do not write to this.__time anywhere but setTime()
                setTime(timeNew) {
                    if (timeNew === null) {
                        timeNew = this.getAttributeDefaultValueInternal('Time');
                    }

                    // time value comes as string from input, convert
                    if (typeof timeNew === 'string') {
                        timeNew = this.__convertToPlcTimeString(timeNew);
                    }

                    // skip processing if value is the same
                    if (tchmi_equal(timeNew, this.__time)) {
                        return;
                    }

                    this.__time = timeNew;

                    TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'Time' });
                    TcHmi.EventProvider.raise(this.__id + ".onTimeChanged", this.__time)

                    this.__processTime();

                }

                getTime() {
                    return this.__time;
                }

                __processTime() {
                    let time = this.__time;
                    this.__timeInp.prop('value', this.__convertToFormatTimeString(time));
                }

                __convertToFormatTimeString(time) {
                    // time input val needs to be formated string, if PT value convert to formated string
                    if (time.includes('PT')) {
                        time = time.replace('PT', '');

                        let hours;
                        let minutes;
                        let seconds;

                        if (time.includes('H')) {
                            hours = time.slice(0, time.indexOf("H"));
                            time = time.slice(time.indexOf("H") + 1);
                            hours = hours.length == 1 ? '0' + hours : hours;
                        } else {
                            hours = '00';
                        }

                        if (time.includes('M')) {
                            minutes = time.slice(0, time.indexOf("M"));
                            time = time.slice(time.indexOf("M") + 1);
                            minutes = minutes.length == 1 ? '0' + minutes : minutes;
                        } else {
                            minutes = '00';
                        }

                        if (time.includes('S')) {
                            seconds = time.slice(0, time.indexOf("S"));
                            time = time.slice(time.indexOf("S") + 1);
                            seconds = seconds.length == 1 ? '0' + seconds : seconds;
                        } else {
                            seconds = '00';
                        }

                        time = hours + ':' + minutes;
                        console.log(time);
                    }

                    return time;

                }

                __convertToPlcTimeString(time) {
                    if (time.includes(':')) {
                        let hours;
                        let minutes;
                        let seconds;

                        let timeValues = time.split(':');

                        time = 'PT';

                        hours = timeValues[0];
                        if (hours > 0) {
                            time += hours + 'H';
                        }
                        minutes = timeValues[1];
                        if (minutes > 0) {
                            time += minutes + 'M';
                        }
                        //seconds = timeValues[2];
                        //if (seconds > 0) {
                        //    time += seconds + 'S';
                        //}
                        if (time == 'PT') {
                            time = 'PT0S';
                        }
                    }

                    return time;

                }

            }
            TcHmiTimeInput.Timepicker = Timepicker;
        })(TcHmiTimeInput = Controls.TcHmiTimeInput || (Controls.TcHmiTimeInput = {}));
    })(Controls = TcHmi.Controls || (TcHmi.Controls = {}));
})(TcHmi || (TcHmi = {}));

/**
 * Register Control
 */
TcHmi.Controls.registerEx('Timepicker', 'TcHmi.Controls.TcHmiTimeInput', TcHmi.Controls.TcHmiTimeInput.Timepicker);
