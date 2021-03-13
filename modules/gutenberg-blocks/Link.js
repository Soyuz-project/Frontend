/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
// import { RouterLink, RouterView } from 'vue-router';
const dropdowncheck = (link, router, page = '') => {
  const l = saniturl(link),
    q = l[1] ? `?${l[1]}` : '',
    r = router.params,
    qq = Object.keys(router.query)
      .map((key) => key + '=' + router.query[key])
      .join('&');

  return l[0] == r.menuItem
    ? '/'
    : `/${r.slug ? r.slug : 'home-page'}${r.post_name ? '/' + r.post_name : ''}/menu/${l[0]}/${page}${q}?${qq}`;
};
const saniturl = (link) => {
  return link.split('?');
};

export default {
  name: 'Link',
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },

  render(h) {
    const slots = this.$scopedSlots.default();
    const attrs = { ...this.blockAttrs, ...this.blockAttrs.componentAttrsOBJ };
    const BlocksBySlug = (
      <inner-block
        r={{ p: this.$route.params, q: this.$route.query }}
        blocks={{
          blockName: 'BlocksBySlug',
          attrs: { pageSlug: attrs.page } || {},
        }}
      />
    );
    const Icon = (
      <inner-block
        r={{ p: this.$route.params, q: this.$route.query }}
        blocks={{
          blockName: 'Icon',
          attrs: attrs.icon || {},
        }}
      />
    );
    function handle(p, q, r) {
      r.push({
        path: p.slug ? (p.post_name ? `/${p.slug}/${p.post_name}` : `/${p.slug}`) : '/home-page',
      });
    }
    return slots ? (
      <li class="">
        {/* blocks page */}
        {attrs.page ? (
          BlocksBySlug
        ) : (
          <router-link to={dropdowncheck(attrs.url, this.$route, attrs.page)} aria-label={attrs.url}>
            {attrs.hidden ? null : <span class="dropdown-label">{attrs.label}</span>}

            {/* icon */}
            {attrs.icon ? Icon : null}
          </router-link>
        )}
        {this.$route.params.menuItem == saniturl(attrs.url)[0] && (
          <ul class="dropdown -reset">
            <li class="dropdown-mask" onClick={() => handle(this.$route.params, this.$route.query, this.$router)}></li>
            <ul class={`nav-sub ${attrs.align}`}>{slots}</ul>
          </ul>
        )}
      </li>
    ) : (
      <li>
        {/* blocks page */}
        {attrs.page ? (
          BlocksBySlug
        ) : (
          <router-link to={attrs.url ? attrs.url : ''} aria-label={attrs.url} exact>
            {attrs.hidden ? null : attrs.label}
            {/* icon */}
            {attrs.icon ? Icon : null}
          </router-link>
        )}
      </li>
    );
  },
};
