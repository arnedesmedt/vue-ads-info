<template>
    <vue-ads-context
        :visible="visible"
        :disable="disable"
        :toggle-type="toggleType"
        :vertical-position="verticalPosition"
        :horizontal-position="horizontalPosition"
    >
        <div slot="context" :class="popoverClasses">
            <div
                class="vue-ads-triangle"
                :class="triangleClasses"
            >
            </div>
            <div
                class="vue-ads-rounded-sm vue-ads-bg-grey-dark vue-ads-text-white vue-ads-p-1 vue-ads-text-sm vue-ads-shadow"
            >
                <slot name="info">Info</slot>
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
    },

    computed: {
        triangleClasses () {
            return {
                'vue-ads-absolute': true,
            };
        },

        popoverClasses () {
            return {
                'vue-ads-popover-bottom': false,
                'vue-ads-popover-top': false,
                'vue-ads-popover-left': true,
                'vue-ads-popover-right': false,
            };
        },
    },
};
</script>

<style scoped>
.vue-ads-popover-bottom:before {
    border-top: 0.5rem solid rgba(0,0,0,0.85);
    border-right: 0.5rem solid transparent;
    border-left: 0.5rem solid transparent;
    bottom: -0.5rem;
    left: 50%;
    margin-left: -0.5rem;
}

.vue-ads-popover-top:before {
    border-bottom: 0.5rem solid rgba(0,0,0,0.85);
    border-right: 0.5rem solid transparent;
    border-left: 0.5rem solid transparent;
    top: 0;
    left: 50%;
    margin-left: -0.5rem;
}

.vue-ads-popover-left:before {
    border-right: 0.5rem solid rgba(0,0,0,0.85);
    border-top: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
    left: 0;
    margin-left: -0.5rem;
    top: 50%;
    margin-top: -0.5rem;
}

.vue-ads-popover-right:before {
    border-left: 0.5rem solid rgba(0,0,0,0.85);
    border-top: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
    right: 0;
    margin-right: -0.5rem;
    top: 50%;
    margin-top: -0.5rem;
}
</style>
