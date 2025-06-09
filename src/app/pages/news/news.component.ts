import { Component } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {BreadcrumbComponent} from "../common/breadcrumb/breadcrumb.component";
import {NgForOf} from "@angular/common";

interface NewsItem {
  title: string;
  link: string;
  image: string;
  backgroundColor?: string;
  description: string;
}

@Component({
  selector: 'app-news',
  standalone: true,
  templateUrl: './news.component.html',
  imports: [
    NgForOf,
    BreadcrumbComponent
  ],
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  newsItems: NewsItem[] = [
    {
      title: 'DECCAN HERALD',
      link: 'https://www.deccanherald.com/brandspot/pr-spot/celebrating-excellence-indian-icon-awards-2023-honour-industry-leaders-and-talented-entrepreneurs-1197621.html',
      image: 'img/news-1.jpg',
      description: 'Celebrating Excellence: Indian Icon Awards 2023 Honour Industry Leaders and Talented Entrepreneurs',
    },
    {
      title: 'THE WEEK',
      link: 'https://www.theweek.in/wire-updates/business/2023/02/28/dcm63-indian-icon-awards-2023.html',
      image: 'img/news-2.png',
      backgroundColor: '#d51a21',
      description: 'Celebrating Excellence Indian Icon Awards 2023 Honour Industry Leaders and Talented Entrepreneurs',
    },
    {
      title: 'HINDUSTAN TIMES',
      link: 'https://www.hindustantimes.com/brand-stories/indian-icon-awards-2023-honours-industry-leaders-and-talented-entrepreneurs-101677668994210.html',
      image: 'img/news-3.jpg',
      backgroundColor: '#000',
      description: 'Indian Icon Awards 2023 Honours Industry Leaders and Talented Entrepreneurs',
    },
    {
      title: 'ISSUE WIRE',
      link: 'https://www.issuewire.com/moneymoov-announces-strategic-partnership-in-india-with-rucards-1757928422255976',
      image: 'img/news-5.png',
      backgroundColor: '#3c5e80',
      description: 'MoneyMoov Announces Strategic Partnership In India With Rucards',
    },
    {
      title: 'FINANCIAL CONTENT',
      link: 'https://markets.financialcontent.com/stocks/article/issuewire-2023-2-16-moneymoov-announces-strategic-partnership-in-india-with-rucards',
      image: 'img/news-4.png',
      description: 'MoneyMoov Announces Strategic Partnership In India With Rucards',
    }

  ];

  truncateDescription(text: string, limit: number): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
}
