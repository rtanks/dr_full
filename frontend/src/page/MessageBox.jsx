import '../message.css';
import { getKeyRequest, getTypeRequest } from '../services/func/getTypeRequest';
import HeaderTabMenu from '../components/request/HeaderTabMenu';
import { useEffect, useState } from 'react';
import MessageItem from '../components/messageBox/messageItem';
import {useDispatch} from 'react-redux'
import { getShowModal } from '../slices/modalSlice';
import { useQuery } from '@tanstack/react-query';
import HeaderAuth from '../services/api/headerAndUrlService';
import axios from 'axios';

export default function MessageBox() {
    const [status, setStatus] = useState([
      'unread', 'unread', 'read'
    ])
    const [messages, setMessages] = useState([])
    const changeStatusRead = (val, index) => {
      setStatus(status.map((item, indexItem) => indexItem == index? val: item));
    }
    const dispatch = useDispatch();
    const {baseUrl, headers, id} = HeaderAuth();
    const {data, isPending} = useQuery({queryKey: ['messages'], queryFn: async () => {
        const response = await axios.get(`${baseUrl}/user-messages/${id}`, {headers});
        console.log(response.data.allMessage)
        // setMessage(response.data.allMessage)
        return response.data.allMessage;
    }})
    useEffect(() => {
      if(!isPending) {
        console.log(data)
        setMessages(data)
      }
    }, [data])
    return (
          <div className="w-full h-full flex flex-col gap-1">
              <HeaderTabMenu text={`${status.filter(item => item == 'unread').length} پیام خوانده نشده`} titleRequest={getTypeRequest()} keyRequest={getKeyRequest()}/>
              <div className="w-full h-[87%] bg-white rounded-2xl overflow-y-scroll">
                  <main>
                      <div className="sm:p-5">
                        <div id="messages" className="messages">
                          <div className={`border border-[#b95e3c] rounded-xl py-3 px-3.5 bg-[#fff3e0] flex cursor-pointer flex-col gap-2`} data-id="1">
                              <div className="msg-header">
                                <div className="font-bold flex justify-between items-center gap-2 text-[#b95e3c]">
                                  <div className={`w-3 h-3 rounded-full bg-[#b95e3c]`}></div>
                                      دسترسی محدود به پیام ها
                                </div>
                                <button className="btn-link" onClick={() => dispatch(getShowModal({item: 'login'}))}>ورود / ثبت نام</button>
                              </div>
                              <div className={`text-sm text-[#b95e3c]`}>
                                برای مشاهده تمام پیام ها لطفاً وارد حساب کاربری خودشوید در غیر این صورت تنها پیام های عمومی در دسترس میباشند
                              </div>
                          </div>

                          <MessageItem title={' به‌روزرسانی سرویس پرداخت'} index={0} status={status[0]} onClick={changeStatusRead}>
                              درگاه پرداخت با تاخیر موقت مواجه است. تیم فنی در حال بررسی مشکل ارتباطی با بانک‌های طرف قرارداد می‌باشد. 
                              این اختلال ممکن است باعث شود برخی تراکنش‌ها با تأخیر انجام شوند یا نیاز به تلاش مجدد داشته باشند. 
                              لطفاً در صورت مشاهده خطا، شماره تراکنش خود را ثبت کنید تا بتوانیم سریع‌تر پیگیری کنیم.
                          </MessageItem>
                          <MessageItem title={'تیکت شما پاسخ داده شد'} index={1} status={status[1]} onClick={changeStatusRead}>
                              تیم پشتیبانی به تیکت شما با شناسه #T-123 پاسخ داده است. 
                              لطفاً وارد بخش تیکت‌ها شوید و پاسخ را مطالعه کنید. 
                              در صورتی که مشکل همچنان باقی مانده باشد، می‌توانید همان تیکت را دوباره باز کنید یا تیکت جدیدی ثبت نمایید. 
                              توجه داشته باشید که زمان پاسخگویی میانگین بین ۱ تا ۴ ساعت است.
                          </MessageItem>
                          <MessageItem title={'خوش آمدید!'} index={2} status={status[2]} onClick={changeStatusRead}>
                              به TDA24 خوش آمدید. برای شروع بهتر، پیشنهاد می‌کنیم پروفایل خود را تکمیل کنید و اطلاعات تماس و تنظیمات امنیتی را وارد نمایید. 
                              این کار باعث می‌شود در صورت بروز مشکل، تیم پشتیبانی سریع‌تر بتواند شما را شناسایی و راهنمایی کند. 
                              همچنین با تکمیل پروفایل، دسترسی به امکانات ویژه و پیشنهادهای شخصی‌سازی‌شده برای شما فعال خواهد شد.
                          </MessageItem>

                          {
                              messages.map(message => (
                                <MessageItem key={message.id} id={message.id} date={message.create}
                                title={message.title} link={message.link} status={message.status}>{message.text}</MessageItem>
                              ))
                          }
                        </div>
                      </div>
                  </main>
              </div>
          </div>
    )
}