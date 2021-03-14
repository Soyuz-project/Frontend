export const modules = {

  /* CORE BLOCKS */
  coredefault: () => import(/* webpackChunkName: "default" */ '~/modules/gutenberg-blocks/default'),
  coregroup: () => import(/* webpackChunkName: "group" */ '~/modules/gutenberg-blocks/Group.js'),
  corecolumns: () => import(/* webpackChunkName: "group" */ '~/modules/gutenberg-blocks/Group.js'),
  corecolumn: () => import(/* webpackChunkName: "group" */ '~/modules/gutenberg-blocks/Group.js'),
  coreparagraph: () => import(/* webpackChunkName: "content" */ '~/modules/soyuz-core/BlockContent.js'),
  coreheading: () => import(/* webpackChunkName: "content" */ '~/modules/soyuz-core/BlockContent.js'),
  coreimage: () => import(/* webpackChunkName: "default" */ '~/modules/soyuz-core/ResponsiveImg.js'),
  coreseparator: () => import(/* webpackChunkName: "separator" */ '~/modules/gutenberg-blocks/Separator'),
  corespacer: () => import(/* webpackChunkName: "separator" */ '~/modules/gutenberg-blocks/Spacer'),
  corebutton: () => import(/* webpackChunkName: "spacer" */ '~/modules/gutenberg-blocks/Button.js'),
  corebuttons: () => import(/* webpackChunkName: "group" */ '~/modules/gutenberg-blocks/Group.js'),

  /* Render sojuz data */
  
  DataFrame: () => import(/* webpackChunkName: "default" */ '~/modules/soyuz-core/DataFrame.js'),
  BlockContent: () => import(/* webpackChunkName: "default" */ '~/modules/soyuz-core/BlockContent.js'),

  input: () => import(/* webpackChunkName: "acf" */ '~/modules/soyuz-forms/input'),
  file: () => import(/* webpackChunkName: "acf" */ '~/modules/soyuz-forms/file'), 

};
