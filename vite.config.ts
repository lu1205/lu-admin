import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(command, mode, env)
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'vue-router'],
        // 解决eslint报错，先把 enabled 设置为true，重启项目生成.eslintrc-auto-import.json文件，之后设置为false(为true时每次加载都会重新生成文件，可能出现找不到的情况)
        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ],
        // 声明文件生成位置和文件名称
        dts: path.resolve('./auto-imports.d.ts')
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep']
          })
        ],
        dts: path.resolve('./components.d.ts')
      }),
      Icons({
        autoInstall: true
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 3009,
      host: '127.0.0.1',
      open: true,
      https: false,
      hmr: true, //开启热更新
      proxy: {
        '^/api|^/my': {
          target: 'http://127.0.0.1:3007',
          // target: 'http://47.99.95.43:3007',
          changeOrigin: true
        },
        '^/router': {
          target: 'http://127.0.0.1:3007',
          // target: 'http://47.99.95.43:3007',
          changeOrigin: true
        }
      }
    },
    build: {
      target: ['es2015'],
      outDir: 'dist', // 指定输出路径
      assetsDir: 'static', // 指定生成静态文件目录
      assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码
      cssCodeSplit: true, // 启用 CSS 代码拆分
      emptyOutDir: true, //打包前先清空原有打包文件
      // 在这里配置打包时的rollup配置
      rollupOptions: {
        output: {
          //静态资源分类打包
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          // assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          assetFileNames: (chunkInfo: any) => {
            const extFileDirMap: Record<string, string> = {
              'png,gif,jpg,jpeg,svg': '/img'
            }
            const ext = chunkInfo?.name.match(/\.(\w+)$/)?.[1] || 'js'
            const dir =
              Object.keys(extFileDirMap)
                .filter((key) => key.split(',').includes(ext))
                .map((key) => extFileDirMap[key])?.[0] || '[ext]'
            return `static/${dir}/[name].[hash].[ext]`
          },
          manualChunks(id) {
            //静态资源分拆打包
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          }
        }
      }
    },
    optimizeDeps: {
      include: [
        // 'element-plus/es'
        // 'element-plus/es/components/button/style/css',
        // 'element-plus/es/components/form/style/css',
        // 'element-plus/es/components/form-item/style/css',
        // 'element-plus/es/components/input/style/css',
        // 'element-plus/es/components/menu/style/css',
        // 'element-plus/es/components/menu-item/style/css',
        // 'element-plus/es/components/sub-menu/style/css',
        // 'element-plus/es/components/dialog/style/css',
        // 'element-plus/es/components/popover/style/css',
        // 'element-plus/es/components/avatar/style/css',
        // 'element-plus/es/components/icon/style/css',
        // 'echarts'
      ]
    }
  }
})
