<template>
    <!-- 标签页 -->
    <el-tabs class="tabs" :class="$store.state.sys.collapse?'position-collapse-left':'position-left'"
             v-model="mainTabsActiveName" :closable="true" type="card"
             @tab-click="selectedTabHandle" @tab-remove="removeTabHandle">
        <el-dropdown class="tabs-tools" :show-timeout="0" trigger="hover">
            <div style="font-size:20px;width:50px;"><i class="el-icon-arrow-down"></i></div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签</el-dropdown-item>
                <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签</el-dropdown-item>
                <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签</el-dropdown-item>
                <el-dropdown-item @click.native="tabsRefreshCurrentHandle">刷新当前标签</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-tab-pane v-for="item in mainTabs"
                     :key="item.name" :label="item.title" :name="item.name">
            <span slot="label"><i :class="item.icon"></i> {{item.title}} </span>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "HeaderTabs",
        data() {
            return {};
        },
        computed: {
            mainTabs: {
                get () { return this.$store.state.tab.mainTabs },
                set (val) { this.$store.commit('updateMainTabs', val) }
            },
            mainTabsActiveName: {
                get () { return this.$store.state.tab.mainTabsActiveName },
                set (val) { this.$store.commit('updateMainTabsActiveName', val) }
            }
        },
        methods: {
            selectedTabHandle (tab) {
                tab = this.mainTabs.filter(item => item.name === tab.name)
                if (tab.length >= 1) {
                    this.$router.push({ name: tab[0].name })
                }
            },
            removeTabHandle (tabName) {
                this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
                if (this.mainTabs.length >= 1) {
                    // 当前选中tab被删除
                    if (tabName === this.mainTabsActiveName) {
                        this.$router.push({ name: this.mainTabs[this.mainTabs.length - 1].name }, () => {
                            this.mainTabsActiveName = this.$route.name
                        })
                    }
                } else {
                    this.$router.push("/")
                }
            },
            tabsCloseCurrentHandle () {
                this.removeTabHandle(this.mainTabsActiveName)
            },
            tabsCloseOtherHandle () {
                this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName)
            },
            tabsCloseAllHandle () {
                this.mainTabs = []
                this.$router.push("/")
            },
            tabsRefreshCurrentHandle () {
                var tempTabName = this.mainTabsActiveName
                this.removeTabHandle(tempTabName)
                this.$nextTick(() => {
                    this.$router.push({ name: tempTabName })
                })
            }
        }
    };
</script>

<style scoped lang="scss">
    .tabs {
        position: fixed;
        top: 60px;
        right: 50px;
        z-index: 9;
        height: 40px;
        line-height: 40px;
        background-color: rgba(247, 248, 246, 0.55);
    }

    .tabs-tools {
        position: fixed;
        top: 60px;
        right: 0;
        z-index: 9;
        cursor: pointer;
        border: 1px solid #eaeaea;
        height: 40px;
        line-height: 40px;
    }

    .tabs-tools:hover {
        background: rgba(200, 206, 206, 1);
    }

</style>
