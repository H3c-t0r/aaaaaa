﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
//using log4net;
using mojoPortal.Business;
using mojoPortal.Business.WebHelpers;
using mojoPortal.Web.Components;
using mojoPortal.Web.Framework;
using Resources;
namespace mojoPortal.Web.UI
{
	public partial class ViewSelectorSetting : UserControl, ICustomField
    {
        //private static readonly ILog log = LogManager.GetLogger(typeof(ViewSelectorSetting));
        private static SiteSettings siteSettings = CacheHelper.GetCurrentSiteSettings();
        private string themesPath = string.Empty;
        private string globalThemesPath = string.Empty; //these are at a higher level than the current site, can be used by multiple sites
		private string viewName = string.Empty;
		private string controllerName = string.Empty;
		private string viewPath = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            SecurityHelper.DisableBrowserCache();
        }
        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);
            if (HttpContext.Current == null) { return; }
            EnsureItems();
        }

        private void EnsureItems()
        {
            if (ddlLayouts == null)
            {

                ddlLayouts = new DropDownList();
                if (this.Controls.Count == 0) { this.Controls.Add(ddlLayouts); }
            }
            if (ddlLayouts.Items.Count > 0) { return; }

            themesPath = SiteUtils.DetermineSkinBaseUrl(true, false, this.Page) + viewPath;

            List<FileInfo> themeFiles = GetLayouts(themesPath);

            List<ListItem> items = new List<ListItem>();



            if (themeFiles != null)
            {
                PopulateDefinitionList(themeFiles, themesPath);
            }

			if (ddlLayouts.Items.Count == 0)
			{
				ddlLayouts.Enabled = false;
				ddlLayouts.Visible = false;
				litNoLayouts.Text = Resource.NoViewsInSkin;
			}
			else
			{
				ddlLayouts.Items.Insert(0, new ListItem(Resource.ViewSelectDropDown, string.Empty));
			}
        }

        private void PopulateDefinitionList(List<FileInfo> files, string path)
        {
            foreach (FileInfo file in files)
            {
                if (File.Exists(file.FullName))
                {
                    if (file.Name == $"{viewName}.cshtml")
                    {
                        ddlLayouts.Items.Add(new ListItem("Default", viewName));

                    }
                    else
                    {
                        ddlLayouts.Items.Add(new ListItem(file.Name.Replace(".cshtml", "").Replace($"{viewName}--", ""), file.Name.Replace(".cshtml", "")));
                    }
                }
            }
        }
        private List<FileInfo> GetLayouts(string path)
        {
            DirectoryInfo dir = new DirectoryInfo(HttpContext.Current.Server.MapPath(path));
            List<FileInfo> files = new List<FileInfo>();
            if (dir.Exists)
            {
                files.AddRange(dir.GetFiles($"{viewName}.cshtml"));
                files.AddRange(dir.GetFiles($"{viewName}--*.cshtml"));
            }
            return files;
        }

        public string GetValue()
        {
            RazorBridge.FindPartialView(viewName, new { }, controllerName);

            return ddlLayouts.SelectedValue;
        }

        public void SetValue(string val)
        {
            EnsureItems();

            if (val != null)
            {
                ListItem item = ddlLayouts.Items.FindByValue(val);
                if (item != null)
                {
                    ddlLayouts.ClearSelection();
                    item.Selected = true;
                }
            }
        }

		public void Attributes(IDictionary<string, string> attribs)
		{
			foreach (KeyValuePair<string, string> pair in attribs)
			{
				if (pair.Key == "ViewName")
				{
					viewName = pair.Value;
				}
				else if (pair.Key == "ControllerName")
				{
					controllerName = pair.Value;
				}
				else if (pair.Key == "ViewPath")
				{
					viewPath = pair.Value;
				}
				else
				{
					ddlLayouts.Attributes.Add(pair.Key, pair.Value);
				}
			}
		}
	}
}