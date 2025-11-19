import { Injectable } from '@nestjs/common';
import * as QrCode from 'qrcode'

interface CacheItem {dataUrl: string, expireAt: number};

@Injectable()
export class QrService {
  private cache = new Map<string, CacheItem>;
  private ttl = 1000 * 60 * 5; //ttl -> time to live

  private cacheKey(text:string, opts?:any) {
    return `${text}|${JSON.stringify(opts || {})}`
  };

  async toDataUrl(text: string,opts?: QrCode.QrCodeToDataUrl) {
    const key = this.cacheKey(text,opts);
    const now = Date.now();
    const cached = this.cache.get(key);
    if(cached && cached.expireAt > now) return cached.dataUrl;

    const dataUrl = await QrCode.toDataURL(text, opts);
    this.cache.set(key, {dataUrl, expireAt: now + this.ttl});

    return dataUrl;
  }

  cleanup() {
    const now = Date.now();
    for(const [k, v] of this.cache.entries()) if (v.expireAt <= now) this.cache.delete(k)
  }
}
