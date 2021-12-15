import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import RefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { HotModuleReplacementPlugin } from 'webpack';

export default merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 5500,
    hot: true,
    allowedHosts: ['.loca.lt'],
  },
  plugins: [new HotModuleReplacementPlugin(), new RefreshWebpackPlugin()],
});
