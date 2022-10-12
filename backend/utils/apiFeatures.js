export default class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = {...this.queryString};
    const excludesFields = ["page", "sort", "limit", "fields"];
    excludesFields.forEach((field) => delete queryObj[field]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const filteringObj = JSON.parse(queryStr);
    this.query = this.query.find(filteringObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      let keywordObj = {};
      keywordObj = {name: {$regex: this.queryString.keyword, $options: "i"}};
      //Searching in name and description
      // keywordObj.$or = [
      //   {name: {$regex: this.queryString.keyword, $options: "i"}},
      //   {description: {$regex: this.queryString.keyword, $options: "i"}},
      // ];
      this.query = this.query.find(keywordObj);
      this.countBeforePagination = this.query.find(keywordObj);
    }
    return this;
  }

  paginate(docsCounts) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    const endPageIdx = page * limit;

    //Pagination Results
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numOfPages = Math.ceil(docsCounts / limit);
    //nextPage
    if (docsCounts > endPageIdx) {
      pagination.next = page + 1;
    }
    //prevPage
    if (skip > 0) {
      pagination.prev = page - 1;
    }

    this.query = this.query.skip(skip).limit(limit);
    this.paginationResults = pagination;

    return this;
  }
}
