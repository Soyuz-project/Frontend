export const modules = {

  /* CORE BLOCKS - based on Gutenberg blocks */
  coredefault: () => import(/* webpackChunkName: "default" */ '~/modules/gutenberg-blocks/default'),
  coregroup: () => import(/* webpackChunkName: "group" */ '~/modules/gutenberg-blocks/Group.js'),
  corecolumns: () => import(/* webpackChunkName: "group" */ '~/modules/gutenberg-blocks/Group.js'),
  corecolumn: () => import(/* webpackChunkName: "group" */ '~/modules/gutenberg-blocks/Group.js'),
  coreparagraph: () => import(/* webpackChunkName: "content" */ '~/modules/soyuz-core/BlockContent.js'),
  coreheading: () => import(/* webpackChunkName: "content" */ '~/modules/soyuz-core/BlockContent.js'),
  coreseparator: () => import(/* webpackChunkName: "separator" */ '~/modules/gutenberg-blocks/Separator.js'),
  corespacer: () => import(/* webpackChunkName: "separator" */ '~/modules/gutenberg-blocks/Spacer.js'),
  corebutton: () => import(/* webpackChunkName: "spacer" */ '~/modules/gutenberg-blocks/Button.js'),
  corebuttons: () => import(/* webpackChunkName: "group" */ '~/modules/gutenberg-blocks/Group.js'),
  coreimage: () => import(/* webpackChunkName: "image" */ '~/modules/soyuz-core/ResponsiveImg.js'),
  /* Sojuz display blocks */
  coresvg: () => import(/* webpackChunkName: "image" */ '~/modules/image/soyuzSvg.js'),
  

  /* Render sojuz data */
  
  DataFrame: () => import(/* webpackChunkName: "default" */ '~/modules/soyuz-core/DataFrame.js'),
  BlockContent: () => import(/* webpackChunkName: "default" */ '~/modules/soyuz-core/BlockContent.js'),
  Targeter: () => import(/* webpackChunkName: "targeter" */ '~/modules/soyuz-core/Targeter.js'),

  forminput: () => import(/* webpackChunkName: "form" */ '~/modules/soyuz-forms/input.js'),
  formfile: () => import(/* webpackChunkName: "form" */ '~/modules/soyuz-forms/file'), 

};
