import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get("http://localhost:4000/news/getNews");
  }
  addCom(id,comments)
  {
    const data={
      idn:id,
      comText:comments
    }
    return this.http.post("http://localhost:4000/news/addComment",data)
  }
  delete(id)
  {
    const data={
      idn:id
    }
    return this.http.post("http://localhost:4000/news/delete",data)

  }
  search(param)
  {
    return this.http.get(`http://localhost:4000/news/search?param=${param}`);
  }
  update(id,acap)
  {
    const data={
      idn:id,
      cap:acap

    }
    return this.http.post("http://localhost:4000/news/update",data)

  }
}
