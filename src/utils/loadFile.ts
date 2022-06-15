const loadFile = (file: File | Blob): Promise<ArrayBuffer | null | string> => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (e.loaded) res(reader.result);
      rej(`Error while loading a ${file}`);
    };

    reader.onerror = (e) => {
      console.error(e);
      rej(`Error while loading a ${file}`);
    };

    reader.readAsArrayBuffer(file);
  });
};

export default loadFile;
