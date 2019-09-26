import $ from "jquery";


export const fetchRoute = (route, query) => {
  return $.ajax({
    url: `api/intersections/${route}`,
    method: "GET",
    data: {
      query: query
    }
  })
}
