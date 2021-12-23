
export const triggerDownloadScv = function(fileName: string, res: any) {
    // 2. Create blob link to download
    const url = window.URL.createObjectURL(new Blob([res?.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.csv`);  // 3. Append to html page
    document.body.appendChild(link);  // 4. Force download
    link.click();  // 5. Clean up and remove the link
    link?.parentNode?.removeChild(link);
};
