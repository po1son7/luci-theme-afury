#
# luci-theme-afury — LuCI theme for OpenWrt 25.12
#

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-theme-afury
PKG_VERSION:=0.1.0
PKG_RELEASE:=2

PKG_LICENSE:=Apache-2.0
PKG_MAINTAINER:=Afury

LUCI_TITLE:=Afury Theme
LUCI_DEPENDS:=+luci-base
LUCI_PKGARCH:=all

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk

define Package/luci-theme-afury
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=4. Themes
  TITLE:=$(LUCI_TITLE)
  DEPENDS:=$(LUCI_DEPENDS)
  PKGARCH:=$(LUCI_PKGARCH)
endef

define Package/luci-theme-afury/description
  Sharp-corner LuCI theme. Compatible with OpenWrt 25.12 (ucode templates).
endef

define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef

define Build/Configure
endef

define Build/Compile
endef

define Package/luci-theme-afury/install
	$(INSTALL_DIR) $(1)/www/luci-static/afury
	$(CP) ./htdocs/luci-static/afury/. $(1)/www/luci-static/afury/
	$(INSTALL_DIR) $(1)/www/luci-static/afury-dark
	$(CP) ./htdocs/luci-static/afury/. $(1)/www/luci-static/afury-dark/
	$(INSTALL_DIR) $(1)/www/luci-static/afury-light
	$(CP) ./htdocs/luci-static/afury/. $(1)/www/luci-static/afury-light/
	$(INSTALL_DIR) $(1)/www/luci-static/resources/view/afury
	$(INSTALL_DATA) ./htdocs/luci-static/resources/menu-afury.js $(1)/www/luci-static/resources/menu-afury.js
	$(INSTALL_DATA) ./htdocs/luci-static/resources/view/afury/sysauth.js $(1)/www/luci-static/resources/view/afury/sysauth.js
	$(INSTALL_DIR) $(1)/usr/share/ucode/luci/template/themes/afury
	$(CP) ./ucode/template/themes/afury/. $(1)/usr/share/ucode/luci/template/themes/afury/
	$(INSTALL_DIR) $(1)/usr/share/ucode/luci/template/themes/afury-dark
	$(CP) ./ucode/template/themes/afury/. $(1)/usr/share/ucode/luci/template/themes/afury-dark/
	$(INSTALL_DIR) $(1)/usr/share/ucode/luci/template/themes/afury-light
	$(CP) ./ucode/template/themes/afury/. $(1)/usr/share/ucode/luci/template/themes/afury-light/
	$(INSTALL_DIR) $(1)/etc/uci-defaults
	$(INSTALL_BIN) ./root/etc/uci-defaults/90_luci-theme-afury $(1)/etc/uci-defaults/90_luci-theme-afury
endef

define Package/luci-theme-afury/postinst
#!/bin/sh
if [ -z "$${IPKG_INSTROOT}" ]; then
	rm -rf /tmp/luci-* 2>/dev/null || true
fi
exit 0
endef

define Package/luci-theme-afury/postrm
#!/bin/sh
[ -n "$${IPKG_INSTROOT}" ] || {
	uci -q delete luci.themes.Afury
	uci -q delete luci.themes.AfuryDark
	uci -q delete luci.themes.AfuryLight
	uci commit luci
}
endef

$(eval $(call BuildPackage,luci-theme-afury))
