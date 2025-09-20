export const aboutController = {
  index(request, response) {
    const viewData = {
      title: 'About WeatherTop App'
    };
    console.log("about rendering");
    response.render("about-view", viewData);
  },
};
