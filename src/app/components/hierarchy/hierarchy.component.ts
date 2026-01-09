import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Genre {
  id: number;
  name: string;
}

interface Artist {
  id: number;
  genreId: number;
  name: string;
  bio: string;
}

interface Album {
  id: number;
  artistId: number;
  title: string;
  year: number;
  coverUrl: string;
}

@Component({
  selector: 'app-hierarchy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hierarchy.component.html'
})
export class HierarchyComponent {
  genres: Genre[] = [
    { id: 1, name: 'Rock' },
    { id: 2, name: 'Jazz' },
    { id: 3, name: 'Pop' },
    { id: 4, name: 'Classical' }
  ];

  artists: Artist[] = [
    { id: 1, genreId: 1, name: 'The Beatles', bio: 'Legendary English rock band.' },
    { id: 2, genreId: 1, name: 'Pink Floyd', bio: 'Progressive rock pioneers.' },
    { id: 3, genreId: 2, name: 'Miles Davis', bio: 'Jazz trumpeter and composer.' },
    { id: 4, genreId: 3, name: 'Michael Jackson', bio: 'King of Pop.' }
  ];

  albums: Album[] = [
    { id: 1, artistId: 1, title: 'Abbey Road', year: 1969, coverUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=300&h=300' },
    { id: 2, artistId: 1, title: 'Sgt. Pepper', year: 1967, coverUrl: 'https://images.unsplash.com/photo-1535992165812-68d1861aa71e?auto=format&fit=crop&q=80&w=300&h=300' },
    { id: 3, artistId: 2, title: 'The Dark Side of the Moon', year: 1973, coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300&h=300' },
    { id: 4, artistId: 2, title: 'The Wall', year: 1979, coverUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&q=80&w=300&h=300' },
    { id: 5, artistId: 3, title: 'Kind of Blue', year: 1959, coverUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=300&h=300' },
    { id: 6, artistId: 4, title: 'Thriller', year: 1982, coverUrl: 'https://images.unsplash.com/photo-1520872024865-3626b5aa0411?auto=format&fit=crop&q=80&w=300&h=300' }
  ];

  selectedGenre: Genre | null = null;
  selectedArtist: Artist | null = null;

  get filteredArtists(): Artist[] {
    if (!this.selectedGenre) return [];
    return this.artists.filter(a => a.genreId === this.selectedGenre!.id);
  }

  get filteredAlbums(): Album[] {
    if (!this.selectedArtist) return [];
    return this.albums.filter(a => a.artistId === this.selectedArtist!.id);
  }

  selectGenre(genre: Genre) {
    this.selectedGenre = genre;
    this.selectedArtist = null; // Reset artist selection
  }

  selectArtist(artist: Artist) {
    this.selectedArtist = artist;
  }
}
