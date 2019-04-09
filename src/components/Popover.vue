<template>
    <vue-ads-context
        :visible="visible"
        :disable="disable"
        :toggle-type="toggleType"
        :vertical-position="verticalPosition"
        :horizontal-position="horizontalPosition"
    >
        <div slot="context" :class="contextContainerClasses">
            <div
                v-if="!disableArrow"
                :class="arrowContainerClasses"
                :style="arrowContainerStyles"
            >
                <span></span>
                <div
                    class="vue-ads-arrow"
                    :class="allArrowClasses"
                    :style="arrowStyles"
                >
                </div>
            </div>
            <div
                class="vue-ads-context"
                :class="contextClasses"
                :style="contextStyles"
            >
                <slot name="context"></slot>
            </div>
        </div>
        <template slot="item">
            <slot name="item"></slot>
        </template>
    </vue-ads-context>
</template>

<script>

import '../../node_modules/vue-ads-context/dist/vue-ads-context.css';
import VueAdsContext from 'vue-ads-context';
import tailwindDefaults from '../../node_modules/tailwindcss/stubs/defaultConfig.stub';

export default {
    name: 'VueAdsPopover',

    components: {
        VueAdsContext,
    },

    props: {
        visible: {
            type: Boolean,
            default: false,
        },

        disable: {
            type: Boolean,
            default: false,
        },

        toggleType: {
            type: String,
            default: 'hover',
            validation: (toggleType) => {
                return [
                    'hover',
                    'click',
                    'hover-item',
                ].includes(toggleType);
            },
        },

        verticalPosition: {
            type: String,
            default: 'top-bottom',
        },

        horizontalPosition: {
            type: String,
            default: 'middle-middle',
        },

        arrowSize: {
            type: Number,
            default: 4,
        },

        arrowColor: {
            type: String,
            default: '#000',
        },

        arrowClasses: {
            type: Object,
            default: () => {
                return {};
            },
        },

        hideArrow: {
            type: Boolean,
            default: false,
        },
    },

    data () {
        return {
            direction: {
                top: 'col',
                bottom: 'col-reverse',
                left: 'row',
                right: 'row-reverse',
            },
            opposit: {
                top: 'bottom',
                bottom: 'top',
                left: 'right',
                right: 'left',
            },
        };
    },

    computed: {
        borderWidth () {
            return parseInt(tailwindDefaults.theme.borderWidth[this.arrowSize === 1 ? 'default' : this.arrowSize], 10);
        },

        arrow () {
            let vertical = null;
            let horizontal = null;
            let container = null;

            let beneathContext = this.verticalPosition.startsWith('bottom') && this.verticalPosition.endsWith('top');
            let aboveContext = this.verticalPosition.startsWith('top') && this.verticalPosition.endsWith('bottom');
            let rightSideOfContext = this.horizontalPosition.startsWith('right') && this.horizontalPosition.endsWith('left');
            let leftSideOfContext = this.horizontalPosition.startsWith('left') && this.horizontalPosition.endsWith('right');

            if (beneathContext) {
                vertical = 'top';
            } else if (aboveContext) {
                vertical = 'bottom';
            }

            if (rightSideOfContext) {
                horizontal = 'left';
            } else if (leftSideOfContext) {
                horizontal = 'right';
            }

            if (vertical) {
                if (leftSideOfContext) {
                    container = 'right';
                } else if (rightSideOfContext) {
                    container = 'left';
                } else if (
                    (this.horizontalPosition.startsWith('left') && this.horizontalPosition.endsWith('middle')) ||
                    (this.horizontalPosition.startsWith('right') && this.horizontalPosition.endsWith('right')) ||
                    (this.horizontalPosition.startsWith('middle') && this.horizontalPosition.endsWith('right'))
                ) {
                    container = 'right';
                } else if (
                    (this.horizontalPosition.startsWith('left') && this.horizontalPosition.endsWith('left')) ||
                    (this.horizontalPosition.startsWith('right') && this.horizontalPosition.endsWith('middle')) ||
                    (this.horizontalPosition.startsWith('middle') && this.horizontalPosition.endsWith('left'))
                ) {
                    container = 'left';
                }
            }

            if (horizontal) {
                if (
                    (this.verticalPosition.startsWith('top') && this.verticalPosition.endsWith('middle')) ||
                    (this.verticalPosition.startsWith('bottom') && this.verticalPosition.endsWith('bottom')) ||
                    (this.verticalPosition.startsWith('middle') && this.verticalPosition.endsWith('bottom'))
                ) {
                    container = 'bottom';
                } else if (
                    (this.verticalPosition.startsWith('top') && this.verticalPosition.endsWith('top')) ||
                    (this.verticalPosition.startsWith('bottom') && this.verticalPosition.endsWith('middle')) ||
                    (this.verticalPosition.startsWith('middle') && this.verticalPosition.endsWith('top'))
                ) {
                    container = 'top';
                }
            }

            return {
                horizontal,
                vertical,
                container,
            };
        },

        centerArrow () {
            return this.arrow.container === null;
        },

        disableArrow () {
            return this.hideArrow || (!this.arrow.vertical && !this.arrow.horizontal);
        },

        contextContainerClasses () {
            return {
                'vue-ads-flex': !this.disableArrow,
                [`vue-ads-flex-${this.direction[this.arrow.vertical || this.arrow.horizontal]}`]: !this.disableArrow,
            };
        },

        arrowContainerClasses () {
            return {
                'vue-ads-flex': this.arrow.horizontal && this.centerArrow,
                'vue-ads-flex-col': this.arrow.horizontal  && this.centerArrow,
                'vue-ads-justify-center': this.arrow.horizontal  && this.centerArrow,
                'vue-ads-relative': true,
            };
        },

        arrowContainerStyles () {
            let arrowContainerStyles = {};

            if (this.arrow.container) {
                arrowContainerStyles[this.arrow.vertical ? 'height' : 'width'] = `${this.borderWidth * 2}px`;
            }

            return arrowContainerStyles;
        },

        allArrowClasses () {
            let arrowSize = this.arrowSize === 1 ? '' : `-${this.arrowSize}`;

            return Object.assign(
                this.arrowClasses,
                {
                    'vue-ads-border-solid': true,
                    'vue-ads-border-transparent': true,
                    [`vue-ads-border${arrowSize}`]: true,
                    'vue-ads-mx-auto': this.arrow.vertical && this.centerArrow,
                    'vue-ads-absolute': this.arrow.container !== null,
                }
            );
        },

        arrowStyles () {
            let arrowStyles = {
                [`border-${this.opposit[this.arrow.vertical || this.arrow.horizontal]}-color`]: this.arrowColor,
                width: `${this.borderWidth * 2}px`,
            };

            if (this.arrow.container) {
                arrowStyles[this.arrow.container] = `${this.borderWidth}px`;
            }

            return arrowStyles;
        },

        contextClasses () {
            return {};
        },

        contextStyles () {
            return {};
        },
    },
};
</script>
