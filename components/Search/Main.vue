<template>
    <div class="action__btn py-1">
        <Button icon="pi pi-search" class="search_icon_btn !text-xs !md:text-sm"
            :class="`${activeSearchBar ? 'search_active' : ''}`" @click="toggleSearch" />
        <InputText ref="searchField" :class="`${activeSearchBar ? 'active_search' : ''}`" class="search_bar"
            v-model="search" @blur="activeSearchBar = false" :placeholder>
        </InputText>
    </div>
</template>


<script setup>

// const props=defineProps(['placeholder'])
const activeSearchBar = ref(false);
const search = defineModel();
const searchField = ref();
const placeholder = ref('Search')

const toggleSearch = () => {
    activeSearchBar.value = !activeSearchBar.value
    if (activeSearchBar.value) {
        setTimeout(() => {
            searchField.value.$el.focus()
        }, 100);
    }
}

</script>


<style>
.action__btn {
    display: flex;
    background: #f5f6f7;
    border: 1px solid #e2e7f1 !important;
    border-radius: 8px !important;
    outline: none !important;
    transition: all 0.4s ease-in-out !important;
}

.action__btn .p-button.search_icon_btn {
    padding: 8px;
    font-size: 12px;
    transition: all 0.4s ease-in-out !important;
    display: flex;
    background: inherit !important;
    justify-content: center;
    align-items: center;
    color: black;
    border: none !important;
    outline: none !important;
}

.action__btn .p-button.search_icon_btn.search_active {
    margin-right: 0px;
}

.action__btn .p-button.search_icon_btn .p-button-icon {
    width: 20px;
}

.action__btn .search_bar {
    width: 0px !important;
    opacity: 0 !important;
    padding: 0 !important;
    background: inherit !important;
    border: none !important;
    outline: none !important;
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
    transition: all 0.4s ease-in-out !important;
}

.action__btn .search_bar.active_search {
    opacity: 1 !important;
    padding: 8px 12px;
    width: 85px !important;
}
</style>