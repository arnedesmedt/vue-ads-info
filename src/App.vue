<template>
    <div id="app">
        <vue-ads-popover vertical-position="bottom-top" toggle-type="click" class="vue-ads-absolute" style="left: 100px; top: 100px;">
            <div slot="item" class="vue-ads-w-12 vue-ads-h-12 vue-ads-bg-orange vue-ads-text-white vue-ads-p-2">Button</div>
        </vue-ads-popover>
    </div>
</template>

<script>
import './assets/css/tailwind.css';

import VueAdsPopover from './components/Popover';

export default {
    name: 'app',

    components: {
        VueAdsPopover,
    },
};
</script>
